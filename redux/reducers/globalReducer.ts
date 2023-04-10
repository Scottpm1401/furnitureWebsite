import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TemplateType } from '../../models/template';

export type GlobalState = {
  isCollapse: boolean;
  template: TemplateType;
};
// Initial state
const initialState: GlobalState = {
  isCollapse: false,
  template: {
    _id: '',
    banners: [],
    about: {
      _id: '',
      image: '',
      title: [],
      description: [],
    },
    home_footer: [],
    contact: [],
    terms_and_conditions: [],
    privacy_policy: [],
    active: false,
    title: '',
  },
};

// Actual Slice
export const { actions, reducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsCollapse(state, action: PayloadAction<boolean>) {
      state.isCollapse = action.payload;
    },

    setTemplate(state, action: PayloadAction<TemplateType>) {
      state.template = action.payload;
    },
    // Action to set the authentication status
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

const selectors = (<S extends { global: GlobalState }>() => {
  const getState = (state: S) => state.global;
  const selectIsCollapse = createSelector(
    getState,
    (state) => state.isCollapse
  );
  const selectTemplate = createSelector(getState, (state) => state.template);
  const selectBanners = createSelector(
    getState,
    (state) => state.template.banners
  );
  const selectHomeFooter = createSelector(
    getState,
    (state) => state.template.home_footer
  );
  const selectAbout = createSelector(getState, (state) => state.template.about);
  const selectContact = createSelector(
    getState,
    (state) => state.template.contact
  );
  const selectPrivacyPolicy = createSelector(
    getState,
    (state) => state.template.privacy_policy
  );
  const selectTermsAndConditions = createSelector(
    getState,
    (state) => state.template.terms_and_conditions
  );

  return {
    selectIsCollapse,
    selectTemplate,
    selectBanners,
    selectHomeFooter,
    selectAbout,
    selectContact,
    selectPrivacyPolicy,
    selectTermsAndConditions,
  };
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { actions, reducer, selectors };
