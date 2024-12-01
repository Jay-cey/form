// import { SelectChangeEvent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownSelectProps {
  label: string;
  value: string;
  options?: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  value,
  options = [],
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
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
