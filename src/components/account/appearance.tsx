import { useTheme } from "next-themes";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

export const Appearance: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appaerance</h3>
        <p className="text-sm text-muted-foreground">
          Change the theme according to your preferences.
        </p>
      </div>
      <Separator />
      <RadioGroup defaultValue={theme}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="system"
            id="system"
            onClick={() => setTheme("system")}
          />
          <Label htmlFor="system">System</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="light"
            id="light"
            onClick={() => setTheme("light")}
          />
          <Label htmlFor="light">Light</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="dark"
            id="dark"
            onClick={() => setTheme("dark")}
          />
          <Label htmlFor="dark">Dark</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
