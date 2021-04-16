import PageLayout from "./common/PageLayout";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Page404() {
  return (
    <PageLayout title="Page not found (404)" suppressInPageTitle>
      <Alert variant="danger">
        <Alert.Heading>Page not found (404)</Alert.Heading>
        <p>
          The page you are trying to open does not exists.
        </p>
        <p>
          <Alert.Link as={Link} to="/">Go to Homepage</Alert.Link>
        </p>
      </Alert>
    </PageLayout>
  );
}