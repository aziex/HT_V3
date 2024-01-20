import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& a': {
    // color: theme.palette.text.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
  },
}));

const dummyItem = [
  { label: 'loading' },
  { label: 'loading' },
  { label: 'loading' },
];

const CollapsedBreadcrumbs = ({
  maxItems = 5,
  loading,
  items = [],
  pageLabel,
  theme = 'light',
  ...rest
}: any) => {
  const navigate = useNavigate();

  const pushURL = (event: any, item: any) => {
    event.preventDefault();
    if (item.newTab) {
      window.open(item.route, '_blank');
    } else {
      navigate(item.route);
    }
  };

  return (
    <StyledBreadcrumbs
      sx={{ padding: '0px 5px' }}
      maxItems={maxItems}
      aria-label='breadcrumb'
      {...rest}
    >
      {loading &&
        dummyItem.map((item, index) => {
          return <Skeleton style={{ width: '100px' }} key={index} />;
        })}
      {!loading &&
        items.map((item: any, index: number) => {
          return (
            <Tooltip
              title={typeof item.label === 'string' ? item.label : item.label()}
              key={index}
            >
              <Link
                variant='h6'
                color={theme == 'dark' ? '#fff' : 'text.secondary'}
                href={item.route}
                onClick={(event) => pushURL(event, item)}
              >
                {typeof item.label === 'string' ? item.label : item.label()}
              </Link>
            </Tooltip>
          );
        })}

      {pageLabel ? (
        <Typography
          color={theme == 'dark' ? '#fff' : 'text.primary'}
          variant='h6'
        >
          {pageLabel}
        </Typography>
      ) : null}
    </StyledBreadcrumbs>
  );
};

export default memo(CollapsedBreadcrumbs);
