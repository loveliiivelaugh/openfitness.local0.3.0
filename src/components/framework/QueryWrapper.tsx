// import { useEffect, useState } from 'react';
// import { graphqlQueries } from '@/src/utilities/api/graphql/queries';
// import { useQuery } from '@tanstack/react-query';
// import { queries } from '@/src/utilities/api';

// let devBaseUrl = "http://localhost:";
// const defaultOptions = {
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: {}
// };

// type QueryWrapperProps = {
//     path: any
//     children: (status: any) => React.JSX.Element | any
// };

// const QueryWrapper = ({ path, children }: QueryWrapperProps) => {

//     const query = path(graphqlQueries);
//     const url = (devBaseUrl + query.server);

//     const options = {
//         ...defaultOptions,
//         body: JSON.stringify({
//             query: query.value,
//             variables: {
//                 name: 'world'
//             }
//         })
//     };

//     const queryHook = useQuery(queries.graphQuery(query.value));

//     return ({
//         pending: children(queryHook),
//         loading: children(queryHook),
//         error: children(queryHook),
//         success: children(queryHook)
//     }[queryHook.status]);
// };

// export default QueryWrapper;

import { ReactNode } from 'react';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { queries, paths } from '@/src/utilities/api.graphql';
import { graphqlQueries } from '../../../../framework/webpack-react-mf-app2/src/utilities/api.graphql/graphql/queries';


interface QueryWrapperProps {
    children: (data: any) => ReactNode
    path?: (paths: any) => {
        value: string
        server: 4100 | 4200 | 4101
    } | string
    options?: {
        method?: string
        payload?: any
        graphql: false | boolean
    }
    loadingContent?: ReactNode,
    errorContent?: (error: any) => ReactNode,
    [key: string]: any
};

const queryClient = new QueryClient();

const QueryWrapper2 = ({
    path,
    children,
    options
}: QueryWrapperProps) => {
    // **
    //  * queryPath: path => (paths: string[]) => string
    //  * @param {object} - Array of available endpoints in backend services
    //  * @returns {string} - queryPath
    // */

    const queryPath:any = path 
        ? path(
            options?.graphql
                ? graphqlQueries
                : paths
        ) : "";

    const wrapperQuery = useQuery(
        !options?.graphql
            ? queries.query((queryPath as string), options?.payload, options?.method)
            : queries.graphQuery(queryPath.value, queryPath.server),
    );

    return ({
        pending: children(wrapperQuery),
        loading: children(wrapperQuery),
        error: children(wrapperQuery),
        success: children(wrapperQuery)
    }[wrapperQuery.status])
};

const QueryWrapper = ({ children, ...props }: QueryWrapperProps) => (
    <QueryClientProvider client={queryClient}>
        <QueryWrapper2 {...props}>
            {children}
        </QueryWrapper2>
    </QueryClientProvider>
);

export default QueryWrapper;