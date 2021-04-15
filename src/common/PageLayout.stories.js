import PageLayout from "./PageLayout";

const PageLayoutStories = {
  title: 'Common/PageLayout',
  component: PageLayout
}

export default PageLayoutStories;

const Template = (args) => {
  return (<PageLayout {...args} />);
};

export const SamplePage = Template.bind({});
SamplePage.args = {
  title: 'Sample page',
  children: <>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    <p>Alias in ipsum odio reprehenderit voluptatem!</p>
  </>
};