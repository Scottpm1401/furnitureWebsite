import { Button, Flex, Text } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import MinusIcon from '../../public/svg/minus.svg';
import PlusIcon from '../../public/svg/plus.svg';

type Props = {
  quantity: number;
  onUpdate: (quantity: number) => Promise<void>;
};

const Counter = ({ quantity, onUpdate }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleLeftClick = async () => {
    const newCount = count - 1;
    setCount(newCount);
    await handleUpdate(newCount);
  };

  const handleRightClick = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await handleUpdate(newCount);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdate = useCallback(
    debounce(async (value: number) => {
      await onUpdate(value);
    }, 300),
    [onUpdate]
  );

  return (
    <Flex alignItems='center'>
      <Button
        variant='unstyled'
        w='24px'
        h='24px'
        onClick={handleLeftClick}
        disabled={count === 1}
      >
        <MinusIcon />
      </Button>
      <Text marginX='0.5rem' textAlign='center' w='40px' fontWeight='medium'>
        {count}
      </Text>
      <Button variant='unstyled' w='24px' h='24px' onClick={handleRightClick}>
        <PlusIcon />
      </Button>
    </Flex>
  );
};

export default Counter;
