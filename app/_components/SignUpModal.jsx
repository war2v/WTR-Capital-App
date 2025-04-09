import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "./Modal";

const SignUpModal = ({title, onSubmit, openSignIn, setIsOpen, isOpen, signUpFormData, setSignUpFormData}) => {
    
  const closeModal = () => setIsOpen(false);


    return (
        <Modal isOpen={isOpen}>
            <div className="flex justify-center items-center p-2">
                  <h1>
                    {title} Sign Up
                  </h1>
                </div>
              <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
                
                <div className="flex justify-center items-center text-left">
                  <Label className="text-lg font-bold text-slate-600 w-[120px]">email: </Label>
                  <Input type="email" id="email"  onChange={(e) => setSignUpFormData({...signUpFormData, email: e.target.value})}/>
                </div>
                <div className="flex justify-center items-center text-left">
                  <Label className="text-lg font-bold text-slate-600 w-[120px]">username: </Label>
                  <Input type="text" id="username" className="outline-none" onChange={(e) => setSignUpFormData({...signUpFormData, username: e.target.value})}/>
                </div>
                <div className="flex justify-center items-center text-left">
                  <Label className="text-lg font-bold text-slate-600 w-[120px]">cell: </Label>
                  <Input type="text" id="phone" onChange={(e) => setSignUpFormData({...signUpFormData, cell: e.target.value})} className="outline-none"/>
                </div>
                <div className="flex justify-center items-center">
                  <Label className="text-lg font-bold text-slate-600 w-[120px]">password: </Label>
                  <Input className="outline-none" onChange={(e) => setSignUpFormData({...signUpFormData, password: e.target.value})}/>
                </div>
                <div className="flex justify-center items-center">
                  <Label className="text-lg font-bold text-slate-600 w-[120px]">confirm password: </Label>
                  <Input className="outline-none" onChange={(e) => setSignUpFormData({...signUpFormData, password2: e.target.value})}/>
                </div>
                <div className="flex items-center justify-center">
                  <h1 className="text-sm font-normal">
                    Already have an {title} account? 
                  </h1>
                  <button className="m-2 hover:text-blue-400 font-semibold" type="button" onClick={openSignIn}>Sign In</button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <Button 
                        className="
                                
                        bg-slate-100
                        text-blue-400
                        border
                        border-slate-300
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-400
                        hover:text-slate-100
                        hover:border-none
                        transition
                        "
                        type="submit"
                      >
                        continue
                    </Button>
                  <Button 
                        className="
                            
                        bg-slate-100
                        text-red-400
                        border
                        border-slate-300
                        rounded-xl
                        hover:cursor-pointer
                        hover:scale-105
                        hover:bg-blue-400
                        hover:text-red-400
                        hover:border-none
                        transition
                        "
                        onClick={closeModal}>
                        close
                    </Button>
                </div>
              </form>
        </Modal>
    );
}

export default SignUpModal;