import { useUserProfile } from '../../hooks/useUserProfile';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import UserHeader from './UserHeader';
import UserStats from './UserStats';
import RatingChart from './RatingChart';
import Heatmap from './Heatmap';
import TagDistribution from './TagDistribution';
import RatingDistribution from './RatingDistribution';
import SubmissionStats from './SubmissionStats';
import SolvedProblems from './SolvedProblems';
import { useParams } from "react-router-dom";

  

const UserProfile = () => {
  const { username } = useParams();
  const { data, loading, error } = useUserProfile(username);
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-10 ">
      <UserHeader user={data} />
      <UserStats data={data} />
      <SubmissionStats stats={data.submissionStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TagDistribution data={data.problemsByTag} />
        <RatingDistribution data={data.problemsByRating} />
      </div>
      
      <RatingChart ratingHistory={data.ratingHistory} />
      <Heatmap heatmapData={data.heatmapData} />
      <SolvedProblems problems={data.solvedProblems} totalCount={data.solvedCount} />
    </div>
  );
};

export default UserProfile;
