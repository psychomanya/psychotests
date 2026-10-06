import { TestDefinition } from '@/types/test';
import { bdi2Test } from './bdi2';
import { baiTest } from './bai';
import { mbiTest } from './mbi';
import { hadsTest } from './hads';

export const allTests: TestDefinition[] = [bdi2Test, baiTest, hadsTest, mbiTest];

export function getTestById(id: string): TestDefinition | undefined {
  return allTests.find((t) => t.id === id);
}
