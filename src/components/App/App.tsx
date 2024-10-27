import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppSidebar } from "@/components/custom/app-sidebar"
import FormContainer from "@/components/framework/forms/FormContainer";
import ChartsContainer from "@/components/framework/charts/ChartsContainer";
import { useFitnessStore, useUtilityStore } from "@store";
import { LocalDatabaseProvider, useDatabase } from "@database";
import '../../utilities/styles/globals.css';
import '../../globals.css';
import './App.css';


const App = () => {
  return (
    <LocalDatabaseProvider>
      <SidebarProvider>
        <AppSidebar
          side="right"
          variant="floating"
        />
        <Content />
      </SidebarProvider>
    </LocalDatabaseProvider>
  );
};

export default App;

const Content = () => {
  const database = useDatabase();
  const fitnessStore = useFitnessStore();
  const utilityStore = useUtilityStore();
  const sidebar = useSidebar();
  
  console.log("Stores: ", fitnessStore, utilityStore, fitnessStore, database);

  const filterSchema = (tableFilter: string, schema: any) => schema 
    && schema.find((item: { table: string }) => (item.table === tableFilter));

  return (
    <main className="content">
      <p>No user logged in</p>
      <Button onClick={() => {}}>Sign in</Button>
      <h1>Openfitness 3 (local) ♥️</h1>
      <h4>local first * pwa * mfe</h4>
      <h6>Rsbuild (Rust Webpack alternative) * Graphql & REST support * Bun JS runtime</h6>
      <h6>React * Typescript * Tanstack * Zustand</h6>
      <p>Start by creating a profile.</p>
      <p>This data is important and required to track progress and make accurate suggestions according to the data provided.</p>
      <SidebarTrigger />

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
        <Button onClick={() => sidebar.setOpen(true)}>Button</Button>
        <Sheet open>
          <p>Sheet</p>
          <SheetTrigger></SheetTrigger>
          <SheetContent>
            {fitnessStore.fitnessTables.length && (
              <FormContainer schema={filterSchema("food", fitnessStore.fitnessTables)} />
            )}
          </SheetContent>
        </Sheet>
        <Drawer open={true}>
          <p>Drawer</p>
          <DrawerTrigger></DrawerTrigger>
          <DrawerContent>
            {fitnessStore.fitnessTables.length && (
              <FormContainer schema={filterSchema("profile", fitnessStore.fitnessTables)} />
            )}
          </DrawerContent>
        </Drawer>
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Modal
              </DialogTitle>
              <p>Dialog</p>
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