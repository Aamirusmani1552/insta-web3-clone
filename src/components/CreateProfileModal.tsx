import { useState, FC, ReactElement } from 'react'
import { Dialog } from '@headlessui/react'

type Props = {
    
}


type CreateProfileInput = {
  to: string //owner of CC profile
  handle: string
  avatar: string
  metadata: string
  operator?: string
}

const CreateProfileModal:FC<Props> = ():ReactElement => {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={"fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm flex items-center justify-center p-4"}>
      <Dialog.Panel className="bg-white shadow-lg w-full max-w-[500px] p-4 rounded-md flex flex-col gap-4">
        <Dialog.Title className="text-2xl font-bold">Create Profile</Dialog.Title>
        <Dialog.Description className="text-sm text-gray-500">
          Enter Necessary Details
        </Dialog.Description>

        <div className="text-sm flex flex-col gap-2">
            <label htmlFor="handle" className="flex flex-col gap-2">
                <span className="text-gray-500">Handle</span>
                <input type="text" name="handle" id="handle" className=" px-4 py-2 border-2 rounded-md" />
            </label>

            <label htmlFor="handle" className="flex flex-col gap-2">
                <span className="text-gray-500">Handle</span>
                <input type="text" name="handle" id="handle" className=" px-4 py-2 border-2 rounded-md" />
            </label>
        </div>

        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  )
}

export default CreateProfileModal