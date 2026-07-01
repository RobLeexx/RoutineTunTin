import { SegmentedButtons } from 'react-native-paper';

import { RoutineType } from '../../types/routine';

type RoutineTypeSelectorProps = {
  onValueChange: (value: RoutineType) => void;
  value: RoutineType;
};

export function RoutineTypeSelector({ onValueChange, value }: RoutineTypeSelectorProps) {
  return (
    <SegmentedButtons
      buttons={[
        { label: 'Si / No', value: 'boolean' },
        { label: 'Cantidad objetivo', value: 'target' },
        { label: 'Cantidad con minimo', value: 'minimum' },
      ]}
      onValueChange={(nextValue) => onValueChange(nextValue as RoutineType)}
      value={value}
    />
  );
}
