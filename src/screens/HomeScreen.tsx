import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { EmptyState } from '../components/EmptyState';
import { Header } from '../components/Header';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import { ThemeColors, ThemeMode } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskDraft } from '../types/task';

type HomeScreenProps = {
  colors: ThemeColors;
  isDark: boolean;
  mode: ThemeMode;
  onToggleTheme: () => void | Promise<void>;
};

type SummaryCardProps = {
  accent?: boolean;
  colors: ThemeColors;
  label: string;
  value: string;
};

function SummaryCard({ accent = false, colors, label, value }: SummaryCardProps) {
  return (
    <View
      style={[
        styles.summaryCard,
        {
          backgroundColor: accent ? colors.accent : colors.surface,
          borderColor: accent ? colors.accent : colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <Text style={[styles.summaryLabel, { color: accent ? colors.accentContrast : colors.textMuted }]}>
        {label}
      </Text>
      <Text style={[styles.summaryValue, { color: accent ? colors.accentContrast : colors.text }]}>{value}</Text>
    </View>
  );
}

export function HomeScreen({ colors, isDark, mode, onToggleTheme }: HomeScreenProps) {
  const { addTask, deleteTask, isReady, summary, tasks, toggleTask, updateTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort((left, right) => {
        if (left.completed !== right.completed) {
          return Number(left.completed) - Number(right.completed);
        }

        return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
      }),
    [tasks],
  );

  const openCreateModal = () => {
    setSelectedTask(null);
    setModalVisible(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const handleSubmit = async (draft: TaskDraft) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, draft);
    } else {
      await addTask(draft);
    }

    closeModal();
  };

  const handleDelete = (task: Task) => {
    Alert.alert('Delete task', `Remove "${task.title}" from your list?`, [
      { style: 'cancel', text: 'Cancel' },
      {
        style: 'destructive',
        text: 'Delete',
        onPress: () => {
          void deleteTask(task.id);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ExpoStatusBar style={isDark ? 'light' : 'dark'} />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <FlatList
        ListEmptyComponent={isReady ? <EmptyState colors={colors} /> : null}
        ListFooterComponent={<View style={styles.listFooter} />}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Header
              colors={colors}
              mode={mode}
              onToggleTheme={onToggleTheme}
              pendingCount={summary.pending}
            />

            <View style={styles.summaryGrid}>
              <SummaryCard accent colors={colors} label="Total tasks" value={String(summary.total)} />
              <SummaryCard colors={colors} label="Pending" value={String(summary.pending)} />
              <SummaryCard colors={colors} label="Completed" value={String(summary.completed)} />
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your tasks</Text>
          </View>
        }
        contentContainerStyle={styles.content}
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            colors={colors}
            onDelete={handleDelete}
            onEdit={openEditModal}
            onToggleComplete={(task) => {
              void toggleTask(task.id);
            }}
            task={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        accessibilityLabel="Create a new task"
        onPress={openCreateModal}
        style={[
          styles.fab,
          {
            backgroundColor: colors.accent,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <Text style={[styles.fabText, { color: colors.accentContrast }]}>+</Text>
      </Pressable>

      <TaskFormModal
        colors={colors}
        onClose={closeModal}
        onSubmit={handleSubmit}
        task={selectedTask}
        visible={modalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  headerContent: {
    gap: spacing.lg,
    paddingBottom: spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryCard: {
    borderRadius: spacing.radiusLg,
    borderWidth: 1,
    flexGrow: 1,
    minHeight: 116,
    minWidth: '30%',
    padding: spacing.lg,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 22,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  fab: {
    alignItems: 'center',
    borderRadius: 30,
    bottom: 24,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    width: 60,
  },
  fabText: {
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 30,
    marginTop: -1,
  },
  listFooter: {
    height: 96,
  },
});

