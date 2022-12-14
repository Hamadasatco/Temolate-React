import { FC, ReactElement, useState } from 'react';
import loadable from '@loadable/component';

import { pokemonApi } from 'api';

import { Button, Menu, PageMeta } from 'components';
import { WithSpinner } from 'hocs';
import { FETCH_TEXT, PAGE_NAMES, BUTTON_TEXT } from 'constants/commonConstants';

import styles from './fetch.module.scss';

const rndID = (maxID: number): number => Math.floor((Math.random() * maxID) + 1);

// Loadable component or page should not be in index.ts file of components or page folder
const PokemonCard = loadable(() => import(/* webpackChunkName: "pokemon-card" */ 'components/pokemon-card/PokemonCard'), {
  resolveComponent: components => components.PokemonCard,
});

const Fetch: FC = (): ReactElement => {
  const [currentPokemonID, setCurrentPokemonID] = useState(rndID(99));
  const { data, isFetching } = pokemonApi.useGetPokemonSpriteByIdQuery(currentPokemonID, { selectFromResult: ({ data, isFetching }) => ({
    data,
    isFetching,
  }) });

  return (
    <div className='main fetch'>
      <PageMeta title={PAGE_NAMES.FETCH} />
      <h1>{FETCH_TEXT}</h1>
      <Menu />
      <div className={styles.wrapper}>
        <WithSpinner isSpinnerShown={isFetching} minTimeSpinnerShown={300}>
          <PokemonCard name={data?.name} sprite={data?.sprite} />
        </WithSpinner>
      </div>
      <Button className='center' onClick={() => {
        setCurrentPokemonID(rndID(99));
      }}>{BUTTON_TEXT}</Button>
    </div>
  );
};

export { Fetch };
