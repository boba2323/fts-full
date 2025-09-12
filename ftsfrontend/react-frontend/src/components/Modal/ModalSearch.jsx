import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaSearchengin } from "react-icons/fa6";

export default function Modal({
        open,
        setOpen,
        // routeToGoBackTo,
        inputPgNum,
        onClickStartSearch,
        onChange,
        maxPageNum
        }) 
    {
    const search = async ()=>{
        try{
            onClickStartSearch()
            setOpen(false)
        } catch (error) {
            console.error( "Modal search error", error)
        }
    }

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:size-10">
                    <FaSearchengin aria-hidden="true" className="size-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className='flex flex-row items-center'>
                      <DialogTitle as="h3" className="flex items-center  text-gray-700">
                        Enter a number between 1-{maxPageNum} pages
                      </DialogTitle>
                    </div>
                    <div className="mt-2">
                      <input
                        id="inputPgNum"
                        name="inputPgNum"
                        type="number"
                        min={1}
                        max={maxPageNum}
                        onChange={onChange}
                        value={inputPgNum}
                        placeholder="Enter page number"
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:border-orange-200 focus:ring-orange-200"
                        required
                        />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md text-orange-700 px-3 py-2 text-sm
                  ring-1 ring-transparent
                  hover:ring-inset hover:ring-orange-300 bg-white
                  sm:ml-3 sm:w-auto"
                  onClick={search}
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={
                    () => setOpen(false)
                  }
                  className="mt-3 inline-flex w-full justify-center rounded-md
                    ring-1 ring-transparent
                    hover:ring-inset hover:ring-purple-300
                  bg-white px-3 py-2 text-sm  text-gray-700 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}