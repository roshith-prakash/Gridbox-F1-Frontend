import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Please Note</DialogTitle>
                <DialogDescription className="pt-5 text-md text-black">
                  Initial request may take upto a minute due to server
                  limitations. Please be patient.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}
      {/* <SecurityHeaders /> */}
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
