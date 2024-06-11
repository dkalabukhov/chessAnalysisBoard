import FormItem from '../modules/Lobby/FormItem';
import BackGround from '../ui/BackgroundImg/BacgroundImg';
import CustomCard from '../ui/CustomCard/CustomCard';
import HeaderDiv from '../ui/CustomCard/HeaderDiv';

const LobbyPage = () => (
  <BackGround>
    <CustomCard>
      <div className="card-column">
        <HeaderDiv />
        <FormItem />
      </div>
    </CustomCard>
  </BackGround>
);

export default LobbyPage;
