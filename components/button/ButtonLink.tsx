import { Button } from "@/components/ui/button";

interface ButtonLinkProps {
  children: React.ReactNode;
  className?: string;
  disabled?:boolean;
  type?:"submit" | "button" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonLink = ({ children, className ,disabled,type,onClick}: ButtonLinkProps) => {
  return (
    <Button
      size="lg"
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`hover:bg-secondary dark:text-white hover:border border-primary hover:text-black shadow-lg ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonLink;
