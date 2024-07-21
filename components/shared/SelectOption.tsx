import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { frameworks, styles, useCases } from "@/constant";

type SelectOptionProps = {
	type: string;
	state?: boolean;
	placeholder: string;
	onChangeHandler?: (value: string) => void;
	value: string | undefined;
};

const SelectOption = ({ type, placeholder, onChangeHandler, value, state }: SelectOptionProps) => {
	let options: any = [];

	switch (type) {
		case "framework":
			options = frameworks;
			break;
		case "style":
			options = styles;
			break;
		case "usecase":
			options = useCases;
			break;
		default:
			options = [];
	}

	return (
		<Select onValueChange={onChangeHandler} disabled={state} defaultValue={value} value={value}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent side="top" position="popper">
				{options.map((option: any) => (
					<SelectItem key={option.id} value={option.name}>
						{option.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SelectOption;
