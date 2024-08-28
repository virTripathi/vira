import { Select, Option } from "@material-tailwind/react";

export default function SelectInput({ label, value, onChange, options, id, required }) {
    console.log(options);
  return (
    <div>
      <Select
        variant="outlined"
        label={'Select ' + label}
        value={value}
        onChange={(e) => onChange({ target: { name: id, value: e } })}
        required={required}
      >
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.title}
          </Option>
        ))}
      </Select>
    </div>
  );
}
