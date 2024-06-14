import FormItem from '../modules/FormItem';
import BackgroundImg from '../ui/BackgroundImg/BacgroundImg';
import CustomCard from '../ui/CustomCard/CustomCard';
import HeaderDiv from '../ui/CustomCard/HeaderDiv';

const HomePage = () => (
  <BackgroundImg>
    <CustomCard>
      <div className="card-column">
        <HeaderDiv />
        <FormItem />
      </div>
    </CustomCard>
  </BackgroundImg>
);

export default HomePage;
