import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export type AccountState = {
  accessToken: string;
  tokenType: string;
  userId: string;
};

export type SpotifyAppState = {
  searchResult: SpotifyApi.TrackObjectFull[] | [] | string;
  searchOffset: number;
  searchLimit: number;
  playlistName: string;
  playlistDescription: string;
  playlistTracks: SpotifyApi.TrackObjectFull[] | [];
  isTopTracks: boolean;
  isLoading: boolean;
  isPlaylistCreated: boolean;
};

export type StepperProps = {
  steps: AppMenu[];
  activeStep: number;
};

export type TextAreaProps = {
  areaName: string;
  areaLabel: string;
  areaValue: string;
  areaPlaceholder: string;
  areaOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  areaOnBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  areaClassName?: string;
  areaRequired?: boolean;
  areaDisabled?: boolean;
  areaSize: number;
};

export type TrackCardProps = {
  song: SpotifyApi.TrackObjectFull;
};

export type AppMenu = {
  name: string;
  icon: IconDefinition;
};
