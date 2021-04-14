import StoryRouter from 'storybook-react-router';

import '../src/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [StoryRouter()];