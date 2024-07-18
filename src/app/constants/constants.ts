import { Options } from '../interfaces/options';

export const Alphabets: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const status: Options[] = [
  {
    id: 1,
    name: 'Active',
  },
  {
    id: 2,
    name: 'InActive',
  },
];

export const TableHeaders = [
  { id: 'firstName', label: 'USER' },
  { id: 'location', label: 'LOCATION' },
  { id: 'department', label: 'DEPARTMENT' },
  { id: 'role', label: 'ROLE' },
  { id: 'empId', label: 'EMP NO' },
  { id: 'status', label: 'STATUS' },
  { id: 'joiningDate', label: 'JOIN DT' },
];

export const FormModes = {
  AddMode: 'add',
  ViewMode: 'view',
  EditMode: 'edit',
};
