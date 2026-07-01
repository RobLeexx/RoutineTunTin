import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { RoutineForm } from '../components/organisms/RoutineForm';
import { RoutinePreviewCard } from '../components/organisms/RoutinePreviewCard';
import { HomeTemplate } from '../components/templates/HomeTemplate';
import { spacing } from '../constants/spacing';
import { useThemeMode } from '../hooks/useThemeMode';
import { RoutineConfig, RoutineDraft, RoutineType } from '../types/routine';

const initialDraft: RoutineDraft = {
  minimumRequired: '1',
  name: 'Hacer 50 dominadas',
  targetValue: '50',
  type: 'target',
  unit: 'dominadas',
};

const initialRoutine: RoutineConfig = {
  minimumRequired: 1,
  name: 'Hacer 50 dominadas',
  targetValue: 50,
  type: 'target',
  unit: 'dominadas',
};

function parseNumber(value: string, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function buildRoutine(draft: RoutineDraft): RoutineConfig {
  return {
    minimumRequired: draft.type === 'minimum' ? Math.max(parseNumber(draft.minimumRequired, 1), 1) : 0,
    name: draft.name.trim() || 'Nueva rutina',
    targetValue: draft.type === 'boolean' ? 1 : Math.max(parseNumber(draft.targetValue, 1), 1),
    type: draft.type,
    unit: draft.unit.trim(),
  };
}

export function CreateRoutineScreen() {
  const { theme, toggleMode } = useThemeMode();
  const [draft, setDraft] = useState<RoutineDraft>(initialDraft);
  const [editingValue, setEditingValue] = useState('0');
  const [isEditing, setIsEditing] = useState(false);
  const [routine, setRoutine] = useState<RoutineConfig>(initialRoutine);
  const [todayValue, setTodayValue] = useState(0);

  const handleDraftChange = (field: keyof RoutineDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleTypeChange = (type: RoutineType) => {
    setDraft((current) => ({
      ...current,
      minimumRequired: type === 'minimum' ? current.minimumRequired || '1' : '1',
      targetValue: type === 'boolean' ? '1' : current.targetValue || '1',
      type,
    }));
  };

  const handleCreateRoutine = () => {
    const nextRoutine = buildRoutine(draft);
    setRoutine(nextRoutine);
    setTodayValue(0);
    setEditingValue('0');
    setIsEditing(false);
  };

  const handleCheckPress = () => {
    setTodayValue(routine.targetValue);
    setEditingValue(String(routine.targetValue));
    setIsEditing(false);
  };

  const handleEditPress = () => {
    setEditingValue(String(todayValue));
    setIsEditing((current) => !current);
  };

  const handleSaveEdit = () => {
    setTodayValue(parseNumber(editingValue, 0));
    setIsEditing(false);
  };

  return (
    <HomeTemplate>
      <View style={styles.headerRow}>
        <View style={styles.spacer} />
        <IconButton
          accessibilityLabel="Cambiar tema"
          icon="theme-light-dark"
          iconColor={theme.colors.textInverse}
          mode="contained"
          onPress={toggleMode}
          style={[
            styles.themeButton,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
        />
      </View>

      <View style={styles.stack}>
        <RoutineForm
          draft={draft}
          onCreate={handleCreateRoutine}
          onTypeChange={handleTypeChange}
          onValueChange={handleDraftChange}
        />

        <RoutinePreviewCard
          editingValue={editingValue}
          isEditing={isEditing}
          onCheckPress={handleCheckPress}
          onEditPress={handleEditPress}
          onEditingValueChange={setEditingValue}
          onSaveEdit={handleSaveEdit}
          routine={routine}
          todayValue={todayValue}
        />
      </View>
    </HomeTemplate>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  stack: {
    gap: spacing.xl,
  },
  themeButton: {
    margin: 0,
  },
});
