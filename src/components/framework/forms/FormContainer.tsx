// Shadcn Tailwind Version
// for MUI version see: https://cherrytopframework-docs.netlify.app/

import React from 'react';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { Grid, GridItem } from '@/components/ui/grid';
import { Input as TextField } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Typography } from '@/components/ui/typography';
import { useForm } from '@tanstack/react-form';
import { useUtilityStore } from '@store';
// @ts-ignore
import AttachmentIcon from '../../../utilities/assets/AddFileIcon.svg';


const Attachment = () => (
    <Box>
        <Typography variant="body1">
            Progress Photo
        </Typography>
        <Button>
            {AttachmentIcon}
        </Button>
    </Box>
);

interface SelectProps { 
    label: string, 
    enumValues: { 
        value?: string | number, 
        label?: string 
    }[] | string[] 
}

const SelectWrapper = (props: SelectProps) => {
    let options = (props?.enumValues || []);
    return (
        <GridItem>
            <Label id={props?.label}>
                {props?.label}
            </Label>
            <Select {...props}>
                {options.map((option: any, index: number) => (
                    // @ts-ignore
                    <Box key={index} value={(option?.value || option)}>
                        {(option?.label || (option.slice(0, 1).toUpperCase() + option.slice(1)))}
                    </Box>
                ))}
            </Select>
        </GridItem>
    );
};


const buildFields = (fieldsArray: any[], formState: any) => fieldsArray
    .map((field) => {

        // Define common properties for all fields
        const commonProperties = {
            key: field.name,
            id: field.name,
            ...field,
            fullWidth: true
        };

        // console.log("buildFields: ", field, formState);
        // Define properties specific to the field type
        const FieldsProps = {
            TextField: { ...commonProperties },
            Select: {
                ...commonProperties,
                options: (field?.enumValues || []),
                SelectProps: {
                    native: true,
                },
                // value: formState.state.values[field.name],
                defaultValue: formState.state.values[field.name],
            },
            Date: {
                ...commonProperties,
                // value: moment(new Date()).format("YYYY-MM-DD"),
                // placeholder: new Date().toLocaleDateString(),
            },
            Time: {
                ...commonProperties,
                // value: new Date(field.value).toLocaleTimeString(),
                // placeholder: new Date().toLocaleTimeString(),
            },
            Json: {
                ...commonProperties,
                value: JSON.stringify(field.value),
                type: "text",
                multiline: true,
                minRows: 4,
            },
        };

        let type = field?.enumValues ? "select" : field?.type;

        if (field?.columnType.includes("PgDateString")) type = "date";
        if (field?.columnType.includes("PgTime")) type = "time";

        //@ts-ignore
        return ({
            text: <TextField {...FieldsProps.TextField} />,
            string: <TextField {...FieldsProps.TextField} />,
            number: <TextField {...FieldsProps.TextField} />,
            // date: <BasicDatePicker {...FieldsProps.Date} />,
            // time: <BasicTimePicker {...FieldsProps.Time} />,
            select: <SelectWrapper {...FieldsProps.Select} />,
            json: <TextField {...FieldsProps.Json} />,
            attachment: <Attachment />, 
        }[type])
    });

const excludedColumns: string[] = [
    // ...
];

const FormContainer = ({ schema, ...props }: {
    schema: any,
    excludedColumns?: string[],
    handleSubmit?: (submission: any) => void,
    mapDefaultValue?: (args?: any, ...args2: any) => void,
    handleCancelClick?: () => void,
    onChange?: (event?: any, ...args: any) => void
}) => {
    const utilityStore = useUtilityStore(); // utility states

    const fieldsArray = schema?.columns && schema.columns
        .filter((column: { name: string}) => props?.excludedColumns 
            ? props.excludedColumns 
            : !excludedColumns.includes(column.name)
        )
        .map((column: {
            name: string
            dataType?: string
            notNull?: boolean
            enumValues?: string[]
        }) => ({
            label: column.name,
            type: column?.dataType,
            required: column?.notNull,
            value: "",
            ...column
        }));

    const onSubmit = async (values: any) => {
        // Using server-side insert/update
        const response = { error: "No onSubmit request made" };

        if (response.error) utilityStore.createAlert("error", `Something went wrong. Record not saved, ${(response.error as any).message}`);
        else utilityStore.createAlert("success", `${schema.table} record saved.`);

        if (props?.handleSubmit) props.handleSubmit(values);
    };

    console.log("FormContainer: ", schema)
    const defaultValues = Object.assign(
        {},
        ...schema.columns
            .map((column: { name: string }) => ({
                [column.name]: props?.mapDefaultValue
                    ? props.mapDefaultValue(column, {/*callback extras*/})
                    : "", 
            }))
    );

    const validators = {
        onChange: ({ value }: { value: { age: string }}) => {
            // console.log("validators.onChange: ", value)
            if (parseInt(value.age) < 21) {
                return 'Must be 21 or older to sign'
            }
            return undefined;
        },
        // onBlur: ({ value }) => {...}
    };

    const form = useForm({ defaultValues, onSubmit, validators });

    const handleCancelClick = () => {
        form.reset();
        if (props?.handleCancelClick) props.handleCancelClick();
    };

    const handleSubmit = () => form.handleSubmit();

    return (
        <Grid container>

            <GridItem size={12}>
                <Typography variant="h5">
                    Log {schema.table}
                </Typography>
            </GridItem>

            {buildFields(fieldsArray, form)
                .map((Field: any) => Field?.props?.name && (
                    <GridItem key={Field.props.name} size={12}>
                        <form.Field 
                            name={Field.props.name} 
                            validators={{
                                // onChange: (value) => (value > 10)
                            }}
                        >
                            {(field) => (
                                <>
                                {/* {console.log("Field: ", field, Field)} */}
                                    {/* <InputLabel>{Field.props.label.slice(0, 1).toUpperCase() + Field.props.label.slice(1)}</InputLabel> */}
                                    {React.cloneElement(Field, {
                                        ...field,
                                        defaultValue: field.state.value,
                                        onChange: (event) => {
                                            field.handleChange((event.target as any).value);
                                            
                                            if (props?.onChange) props.onChange(field, form);
                                            
                                            return;
                                        },
                                        onBlur: field.handleBlur,
                                        value: field.state.value
                                    })}
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field>
                    </GridItem>
                ))
            }

            <GridItem size={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <Button color="error" onClick={handleCancelClick}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </GridItem>

        </Grid>
    )
};

export default FormContainer
