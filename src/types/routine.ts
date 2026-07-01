export type RoutineType = 'boolean' | 'target' | 'minimum';

export type RoutineDraft = {
  minimumRequired: string;
  name: string;
  targetValue: string;
  type: RoutineType;
  unit: string;
};

export type RoutineConfig = {
  minimumRequired: number;
  name: string;
  targetValue: number;
  type: RoutineType;
  unit: string;
};
