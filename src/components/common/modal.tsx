interface ModalProps {
  children: React.ReactNode
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className='fixed right-0 left-0 bottom-0'>
      <div className="bg-[#333333] rounded-xl shadow-custom sm:py-2 py-4 sm:px-3 px-6 w-fit mx-auto text-white sm:mb-[15px] mb-[30px]">
        {children}
      </div>
    </div>
  )
}

export default Modal;