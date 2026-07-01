import { StyleSheet, View } from 'react-native';
import { Card, Chip, IconButton, ProgressBar, Text, TextInput } from 'react-native-paper';

import { spacing } from '../../constants/spacing';
import { RoutineConfig } from '../../types/routine';

type RoutinePreviewCardProps = {
  editingValue: string;
  isEditing: boolean;
  onCheckPress: () => void;
  onEditPress: () => void;
  onEditingValueChange: (value: string) => void;
  onSaveEdit: () => void;
  routine: RoutineConfig;
  todayValue: number;
};

function getStatus(routine: RoutineConfig, todayValue: number) {
  if (routine.type === 'boolean') {
    return todayValue > 0 ? 'completada' : 'pendiente';
  }

  if (todayValue > routine.targetValue) {
    return 'superada';
  }

  if (todayValue >= routine.targetValue) {
    return 'completada';
  }

  return 'pendiente';
}

function getProgress(routine: RoutineConfig, todayValue: number) {
  if (routine.type === 'boolean') {
    return todayValue > 0 ? 1 : 0;
  }

  return Math.min(todayValue / Math.max(routine.targetValue, 1), 1);
}

function getProgressLabel(routine: RoutineConfig, todayValue: number) {
  if (routine.type === 'boolean') {
    return todayValue > 0 ? 'Completada hoy' : 'Sin completar';
  }

  const unit = routine.unit.trim();
  const suffix = unit ? ` ${unit}` : '';

  if (routine.type === 'minimum') {
    return `${todayValue} / ${routine.targetValue}${suffix} · minimo ${routine.minimumRequired}`;
  }

  return `${todayValue} / ${routine.targetValue}${suffix}`;
}

export function RoutinePreviewCard({
  editingValue,
  isEditing,
  onCheckPress,
  onEditPress,
  onEditingValueChange,
  onSaveEdit,
  routine,
  todayValue,
}: RoutinePreviewCardProps) {
  const allowsEditing = routine.type !== 'boolean';
  const status = getStatus(routine, todayValue);
  const progress = getProgress(routine, todayValue);
  const progressLabel = getProgressLabel(routine, todayValue);
  const chipMode = status === 'pendiente' ? 'flat' : 'outlined';

  return (
    <Card mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text variant="headlineSmall">Vista previa</Text>
            <Text variant="bodyMedium">Asi se veria esta rutina en la pantalla general.</Text>
          </View>
          <Chip compact mode={chipMode}>
            {status}
          </Chip>
        </View>

        <Card mode="contained">
          <Card.Content style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <View style={styles.previewCopy}>
                <Text variant="titleMedium">{routine.name}</Text>
                <Text variant="bodyMedium">{progressLabel}</Text>
              </View>
              <View style={styles.actions}>
                <IconButton icon="check" mode="contained-tonal" onPress={onCheckPress} />
                {allowsEditing ? <IconButton icon="pencil" mode="contained-tonal" onPress={onEditPress} /> : null}
              </View>
            </View>

            <ProgressBar progress={progress} style={styles.progressBar} />

            {isEditing && allowsEditing ? (
              <View style={styles.editRow}>
                <TextInput
                  keyboardType="number-pad"
                  label="Cantidad de hoy"
                  mode="outlined"
                  onChangeText={onEditingValueChange}
                  style={styles.editInput}
                  value={editingValue}
                />
                <IconButton icon="content-save" mode="contained" onPress={onSaveEdit} />
              </View>
            ) : null}
          </Card.Content>
        </Card>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    marginRight: -spacing.sm,
  },
  content: {
    gap: spacing.lg,
    paddingVertical: spacing.sm,
  },
  editInput: {
    flex: 1,
  },
  editRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  previewCard: {
    gap: spacing.md,
  },
  previewCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  previewHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
  },
  progressBar: {
    height: 10,
  },
});
