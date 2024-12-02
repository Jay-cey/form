// import { SelectChangeEvent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownSelectProps {
  label: string;
  name?: string;
  value: string;
  options?: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
  fullWidth?: boolean;
  margin?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  name,
  value,
  options = [],
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        name={name}
        id={label}
        value={value || ''}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
