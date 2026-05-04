import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { Task } from '../types/task';

type TaskCardProps = {
  colors: ThemeColors;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  task: Task;
};

function formatTaskDate(task: Task) {
  const hasBeenUpdated = task.updatedAt !== task.createdAt;
  const label = hasBeenUpdated ? 'Updated' : 'Created';
  const sourceDate = hasBeenUpdated ? task.updatedAt : task.createdAt;

  return `${label} ${new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(sourceDate))}`;
}

export function TaskCard({ colors, onDelete, onEdit, onToggleComplete, task }: TaskCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: task.completed ? colors.accentSoft : colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}
          onPress={() => onToggleComplete(task)}
          style={[
            styles.checkbox,
            {
              backgroundColor: task.completed ? colors.accent : colors.surfaceMuted,
              borderColor: task.completed ? colors.accent : colors.border,
            },
          ]}
        >
          {task.completed ? <Text style={[styles.checkboxTick, { color: colors.accentContrast }]}>✓</Text> : null}
        </Pressable>

        <View style={styles.titleBlock}>
          <Text
            style={[
              styles.title,
              {
                color: task.completed ? colors.textMuted : colors.text,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}
          >
            {task.title}
          </Text>
          {task.description ? (
            <Text
              style={[
                styles.description,
                {
                  color: colors.textMuted,
                  textDecorationLine: task.completed ? 'line-through' : 'none',
                },
              ]}
            >
              {task.description}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.metaGroup}>
          <View style={[styles.statusPill, { backgroundColor: task.completed ? colors.accentSoft : colors.surfaceAlt }]}>
            <Text style={[styles.statusText, { color: task.completed ? colors.accent : colors.textMuted }]}>
              {task.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
          <Text style={[styles.date, { color: colors.textSoft }]}>{formatTaskDate(task)}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => onEdit(task)}
            style={[styles.actionButton, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}
          >
            <Text style={[styles.actionText, { color: colors.text }]}>Edit</Text>
          </Pressable>
          <Pressable
            onPress={() => onDelete(task)}
            style={[styles.actionButton, { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft }]}
          >
            <Text style={[styles.actionText, { color: colors.danger }]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.radiusLg,
    borderWidth: 1,
    gap: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  checkbox: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    marginTop: 2,
    width: 28,
  },
  checkboxTick: {
    fontSize: 15,
    fontWeight: '900',
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  metaGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statusPill: {
    borderRadius: spacing.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    borderRadius: spacing.pill,
    borderWidth: 1,
    minHeight: 38,
    minWidth: 78,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});

