import { TestDefinition } from '@/types/test';
import { bdi2Test } from './bdi2';
import { baiTest } from './bai';
import { hadsTest } from './hads';
import { mbiTest } from './mbi';
import { ysqTest } from './ysq';

export const allTests: TestDefinition[] = [bdi2Test, baiTest, hadsTest, mbiTest, ysqTest];

export function getTestById(id: string): TestDefinition | undefined {
  return allTests.find((t) => t.id === id);
}
