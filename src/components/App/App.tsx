import { useDatabase } from "@database";
import { useFitnessStore, useUtilityStore } from "@store";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/app-sidebar"
import { Button } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Drawer, DrawerClose, DrawerContent, DrawerDescription, 
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger 
} from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormContainer from "@/components/framework/forms/FormContainer";
import ChartsContainer from "@/components/framework/charts/ChartsContainer";
import '../../utilities/styles/globals.css';
import '../../globals.css';
import './Dialog.styles.css'
import './App.css';
import { DialogTrigger } from "@radix-ui/react-dialog";


const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar
        side="right"
        variant="floating"
      />
      <Content />
    </SidebarProvider>
  );
};

export default App;

const Content = () => {
  const databaseHook = useDatabase();
  const fitnessStore = useFitnessStore();
  const utilityStore = useUtilityStore();
  const sidebar = useSidebar();
  
  console.log("Stores: ", sidebar, fitnessStore, utilityStore, fitnessStore, databaseHook);

  const filterSchema = (tableFilter: string, schema: any) => schema 
    && schema.find((item: { table: string }) => (item.table === tableFilter));

  return (
    <main >
      <p>No user logged in</p>
      {/* <button onClick={async () => {
        console.log("Sending message~");
        const response = await client.post("/aichat/postChat", {
          id: "1",
          message: {
            sender: "user",
            text: "Hello how are you?!",
            model: "llama3.1:latest"
          }
        })
        console.log("aichat.response: ", response)
      }}>Send Message</button> */}
      <h1>Openfitness 3 (local) ♥️</h1>
      <h4>local first * pwa * mfe</h4>
      <h6>Rsbuild (Rust Webpack alternative) * Graphql & REST support * Bun JS runtime</h6>
      <h6>React * Typescript * Tanstack * Zustand</h6>
      <p>Start by creating a profile.</p>
      <p>This data is important and required to track progress and make accurate suggestions according to the data provided.</p>
      <SidebarTrigger />
      
      <FormContainer schema={{
          table: "Name",
          columns: [
            {
              name: "name"
            }
          ]
        }}
      />

      <h3>|</h3>
      <h3>Birthday</h3>
      <h3>|</h3>
      <h3>Height</h3>
      <h3>|</h3>
      <h3>Weight</h3>
      <h3>|</h3>
      <h3>Gender</h3>
      <h3>|</h3>
      <h3>Activity level</h3>
      <h3>|</h3>
      <h3>Exercise frequency</h3>
      <h3>|</h3>
      <h2>Calculates: </h2>
      <hr />
      <h3>TDEE</h3>
      <h3>BMR</h3>

      <Grid container>
        { // Gets all the data needed for all the charts and the ChartsContainer ...
          // ... maps the data into each chart needed for each table available
          fitnessStore?.fitnessTables.length
          && fitnessStore.fitnessTables
            .map(({ table, rows }: { table: string, rows: any[] }) => (
              <GridItem key={table}>
                <p>{table}</p>
                <ChartsContainer charts={rows} />
              </GridItem>
            ))
        }
      </Grid>
      
      {/* Below handles side and bottom drawer -- incudes forms for all tables */}
      <Grid container>
        <Button onClick={() => {}}>Button</Button>
        <Sheet>
          <p>Sheet</p>
          <SheetTrigger>Open Sheet</SheetTrigger>
          <SheetContent>
            {fitnessStore.fitnessTables.length && (
              <FormContainer schema={filterSchema("food", fitnessStore.fitnessTables)} />
            )}
          </SheetContent>
        </Sheet>
        <Drawer>
          <p>Drawer</p>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            {fitnessStore.fitnessTables.length && (
              <FormContainer schema={filterSchema("profile", fitnessStore.fitnessTables)} />
            )}
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Dialog>
          <DialogTrigger>Open Launch</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Modal
              </DialogTitle>
              <p>Dialog</p>
              {console.log("in Dialog: ", fitnessStore)}
              {fitnessStore.fitnessTables.length && (
                <FormContainer schema={filterSchema("weight", fitnessStore.fitnessTables)} />
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Grid>
    </main>
  )
}