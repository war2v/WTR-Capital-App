import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "./Modal";

const SignInModal = ({title, onSubmit, openSignUp, setIsOpen, isOpen, signInFormData, setSignInFormData}) => {
    
    const closeModal = () => setIsOpen(false);
    const handleClick = () => {
        
        openSignUp();
    }


    return (
        <Modal isOpen={isOpen}>
            <div className="flex justify-center items-center p-2 ">
                  <h1>
                    {title} Sign In
                  </h1>
                </div>
              <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
                
                <div className="flex justify-center items-center text-left">
                  <Label className="text-lg font-bold text-slate-600 w-[120px]">email: </Label>
                  <Input  id="email" className="outline-none" onChange={(e) => setSignInFormData({...signInFormData, email: e.target.value})}/>
                </div>
                <div className="flex justify-center items-center">
                <Label className="text-lg font-bold text-slate-600 w-[120px]">password: </Label>
                  <Input className="outline-none" onChange={(e) => setSignInFormData({...signInFormData, password: e.target.value})}/>
                </div>
                <div className="flex items-center justify-center">
                  <h1 className="text-sm font-normal">
                    Don't Have A {title} Account? 
                  </h1>
                  <button className="m-2 hover:text-blue-400 font-semibold" type="button" onClick={handleClick}>Become A {title}</button>
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

export default SignInModal;