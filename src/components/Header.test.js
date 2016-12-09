import React from 'react';
import { Loading, Description, PublicationDate, Title, FilterLinks } from './Header';
import renderer from 'react-test-renderer';

test('Loading appears when buoy data is loading', () => {
  const component = renderer.create(
    <Loading loading={true}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();


  const nullComponent = renderer.create(
    <Loading loading={false}/>
  );
  tree = nullComponent.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Description renders', () => {
  const component = renderer.create(
    <Description description={'Hello, this is the description'}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Publication Date renders', () => {
  const component = renderer.create(
    <PublicationDate pubDate={'Fri, 09 Dec 2016 00:16:24 +0000'}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Title renders', () => {
  const component = renderer.create(
    <Title title={'NDBC - Station Observations near 40N 73W'}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FilterLinks render with feedback', () => {
  const componentAll = renderer.create(
    <FilterLinks visibilityFilter={'SHOW_ALL'}/>
  );
  let tree = componentAll.toJSON();
  expect(tree).toMatchSnapshot();

  const componentFavorite = renderer.create(
    <FilterLinks visibilityFilter={'SHOW_FAVORITE'}/>
  );
  tree = componentFavorite.toJSON();
  expect(tree).toMatchSnapshot();
});
