import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ButtonModal = ({ label, body }: { label?: string; body?: any }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="data" className="font-medium text-sm">
          {label}
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-2 border-primaryRed lg:h-12 h-10 text-left font-normal"
            >
              Add {label}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">{body}</DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ButtonModal;
