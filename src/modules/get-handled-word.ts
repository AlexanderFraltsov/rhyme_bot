import { getYo } from './get-yo';
import { stressForOneSyllable } from './stress-for-one-syllable';

export const getHandledWord = (word: string): string => stressForOneSyllable(getYo(word.toLowerCase()));
