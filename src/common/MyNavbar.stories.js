import MyNavbar from "./MyNavbar";

const MyNavbarStories = {
  title: 'Common/MyNavbar',
  component: MyNavbar
};

export default MyNavbarStories;

const Template = (args) => {
  return (<MyNavbar {...args} />);
};

export const Default = Template.bind({});