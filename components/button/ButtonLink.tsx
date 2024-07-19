import { Button } from "@/components/ui/button";

interface ButtonLinkProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonLink = ({ children, className }: ButtonLinkProps) => {
  return (
    <Button
      size="lg"
      className={`hover:bg-secondary dark:text-white hover:border border-primary hover:text-black shadow-lg ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonLink;
