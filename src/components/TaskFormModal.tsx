import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ThemeColors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { Task, TaskDraft } from '../types/task';

type TaskFormModalProps = {
  colors: ThemeColors;
  onClose: () => void;
  onSubmit: (draft: TaskDraft) => void | Promise<void>;
  task?: Task | null;
  visible: boolean;
};

const emptyDraft: TaskDraft = {
  title: '',
  description: '',
};

export function TaskFormModal({
  colors,
  onClose,
  onSubmit,
  task,
  visible,
}: TaskFormModalProps) {
  const [draft, setDraft] = useState<TaskDraft>(emptyDraft);
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (!visible) {
      return;
    }

    setErrors({});
    setDraft(
      task
        ? {
            title: task.title,
            description: task.description ?? '',
          }
        : emptyDraft,
    );
  }, [task, visible]);

  const handleSave = async () => {
    if (!draft.title.trim()) {
      setErrors({ title: 'Please add a title for this task.' });
      return;
    }

    await onSubmit(draft);
    setDraft(emptyDraft);
    setErrors({});
  };

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.text }]}>
                {task ? 'Edit task' : 'Create task'}
              </Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                {task ? 'Update the details and keep moving.' : 'Capture the next thing that matters.'}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.closeButtonText, { color: colors.text }]}>Close</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Title</Text>
              <TextInput
                onChangeText={(title) => {
                  setDraft((current) => ({ ...current, title }));
                  if (errors.title) {
                    setErrors({});
                  }
                }}
                placeholder="Finish sprint notes"
                placeholderTextColor={colors.textSoft}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surface,
                    borderColor: errors.title ? colors.danger : colors.border,
                    color: colors.text,
                  },
                ]}
                value={draft.title}
              />
              {errors.title ? (
                <Text style={[styles.errorText, { color: colors.danger }]}>{errors.title}</Text>
              ) : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Description</Text>
              <TextInput
                multiline
                numberOfLines={4}
                onChangeText={(description) => setDraft((current) => ({ ...current, description }))}
                placeholder="Optional details, notes, or context."
                placeholderTextColor={colors.textSoft}
                style={[
                  styles.input,
                  styles.textarea,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                textAlignVertical="top"
                value={draft.description}
              />
            </View>
          </ScrollView>

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                void handleSave();
              }}
              style={[styles.primaryButton, { backgroundColor: colors.accent }]}
            >
              <Text style={[styles.primaryButtonText, { color: colors.accentContrast }]}>
                {task ? 'Save changes' : 'Create task'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  sheet: {
    borderRadius: spacing.radiusLg,
    borderWidth: 1,
    maxHeight: '88%',
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: spacing.pill,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: spacing.md,
  },
  closeButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.md,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    borderRadius: spacing.radiusMd,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  textarea: {
    minHeight: 120,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: spacing.pill,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: spacing.pill,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
  },
});

