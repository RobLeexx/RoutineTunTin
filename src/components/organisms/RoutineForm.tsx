import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

import { spacing } from '../../constants/spacing';
import { RoutineDraft, RoutineType } from '../../types/routine';
import { RoutineTypeSelector } from '../molecules/RoutineTypeSelector';

type RoutineFormProps = {
  draft: RoutineDraft;
  onCreate: () => void;
  onTypeChange: (value: RoutineType) => void;
  onValueChange: (field: keyof RoutineDraft, value: string) => void;
};

export function RoutineForm({ draft, onCreate, onTypeChange, onValueChange }: RoutineFormProps) {
  const needsQuantity = draft.type !== 'boolean';
  const needsMinimum = draft.type === 'minimum';

  return (
    <Card mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineSmall">Crear rutina</Text>
          <Text variant="bodyMedium">Define el tipo de seguimiento y revisa la vista previa antes de guardar.</Text>
        </View>

        <TextInput
          label="Nombre de la rutina"
          mode="outlined"
          onChangeText={(value) => onValueChange('name', value)}
          placeholder="Ej: Hacer 50 dominadas"
          value={draft.name}
        />

        <View style={styles.fieldGroup}>
          <Text variant="labelLarge">Tipo</Text>
          <RoutineTypeSelector onValueChange={onTypeChange} value={draft.type} />
        </View>

        <TextInput
          label="Unidad"
          mode="outlined"
          onChangeText={(value) => onValueChange('unit', value)}
          placeholder="Ej: dominadas, pomodoros, minutos"
          value={draft.unit}
        />

        {needsQuantity ? (
          <TextInput
            keyboardType="number-pad"
            label="Objetivo diario"
            mode="outlined"
            onChangeText={(value) => onValueChange('targetValue', value)}
            value={draft.targetValue}
          />
        ) : null}

        {needsMinimum ? (
          <TextInput
            keyboardType="number-pad"
            label="Minimo requerido"
            mode="outlined"
            onChangeText={(value) => onValueChange('minimumRequired', value)}
            value={draft.minimumRequired}
          />
        ) : null}

        <Button mode="contained" onPress={onCreate}>
          Crear rutina
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingVertical: spacing.sm,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  header: {
    gap: spacing.xs,
  },
});
