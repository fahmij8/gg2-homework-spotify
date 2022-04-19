/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-unnecessary-act */
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from 'store';
import {act} from 'react-dom/test-utils';
import CreatePlaylistSearch from './CreatePlaylistSearch';
import searchSample from 'utils/sample';

const server = setupServer(
  rest.get('/sampleResults', (_, res, ctx) => {
    return res(ctx.json(searchSample));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Test search & card component', () => {
  it('should render search component', () => {
    act(() => {
      render(
        <Provider store={store}>
          <CreatePlaylistSearch />
        </Provider>,
      );
    });
    expect(
      screen.getByPlaceholderText('Artist, Songs, or Albums'),
    ).toBeInTheDocument();
  });

  it('should render search component with mock result data in track card', async () => {
    const mockResult: SpotifyApi.TrackObjectFull[] = await fetch(
      '/sampleResults',
    ).then((res) => res.json());
    act(() => {
      render(
        <Provider store={store}>
          <CreatePlaylistSearch mockResult={mockResult} />
        </Provider>,
      );
    });
    screen.getAllByTestId('track-card').forEach((card, index) => {
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(mockResult[index].name);
      expect(card).toHaveTextContent(mockResult[index].artists[0].name);
      expect(card).toHaveTextContent(mockResult[index].album.name);
      expect(card).toHaveTextContent('Add');
    });
  });
});
