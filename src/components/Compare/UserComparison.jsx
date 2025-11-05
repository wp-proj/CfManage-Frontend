import { useCompareUsers } from '../../hooks/useCompareUsers';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import UserComparisonHeader from './UserComparisonHeader';
import StatsComparison from './StatsComparison';
import TagComparison from './TagComparison';
import CommonProblems from './CommonProblems';
import UniqueProblems from './UniqueProblems';

const UserComparison = ({ user1, user2 }) => {
  const { data, loading, error } = useCompareUsers(user1, user2);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-16 mt-12 mb-20 px-4 sm:px-6 lg:px-8">
      {/* User Header Section */}
      <div className="pt-6">
        <UserComparisonHeader
          user1Data={data.user1}
          user2Data={data.user2}
        />
      </div>

      {/* Statistics Comparison */}
      <div className="mt-8">
        <StatsComparison
          user1Data={data.user1}
          user2Data={data.user2}
          ratingComparison={data.comparison.ratingComparison}
        />
      </div>

      {/* Tag Comparison */}
      <div className="mt-10">
        <TagComparison tagData={data.comparison.tagDistributionComparison} />
      </div>

      {/* Common Problems */}
      <div className="mt-10">
        <CommonProblems problems={data.comparison.commonProblems} />
      </div>

      {/* Unique Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <UniqueProblems
          username={data.user1.username}
          problems={data.comparison.user1Unique}
          color="blue"
        />
        <UniqueProblems
          username={data.user2.username}
          problems={data.comparison.user2Unique}
          color="purple"
        />
      </div>
    </div>
  );
};

export default UserComparison;
