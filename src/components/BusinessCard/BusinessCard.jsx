import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/Share';

const styles = {
  root: {
    '& .MuiSvgIcon-root': {
      padding: '6px 6px;',
    },
    maxWidth: 500,
  },
  rating: {
    display: 'block',
    'text-align': 'center',
  },
  cardMedia: {
    width: 350,
    height: 200,
    margin: 'auto',
  },
  // todo: this needs to be a hyrperlink
  location: {
    display: 'flex',
    'flex-direction': 'row',
    marginBottom: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textDecorationLine: 'underline',
  },

  distance: {
    textAlign: 'right',
    flexGrow: 2,
  },
  address: {
    marginRight: 30,
    flexGrow: 1,
  },
  chipWrapper: {
    'margin-top': '15px',
  },
  filter: {
    margin: '15px 20px 15px 0',
  },
  shareButton: {
    float: 'right',
    padding: '6px 6px',
  },
};

const BusinessCard = ({
  classes,
  name,
  category,
  averageRating,
  imageUrl,
  address,
  distance,
  filters,
}) => {
  const chipRenderer = () => {
    const filtersToRender = filters.slice(0, 4);
    const chips = filtersToRender.map((filter) => (
      <Chip color="secondary" label={filter.name} className={classes.filter} />
    ));
    return chips;
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div color="secondary">
            <StarIcon color="secondary" fontSize="large" />
            <Typography
              variant="body2"
              color="secondary"
              className={classes.rating}
            >
              {averageRating}
            </Typography>
          </div>
        }
        action={<BookmarkBorderIcon fontSize="large" color="secondary" />}
        title={<Typography variant="h6">{name}</Typography>}
        subheader={<Typography variant="body2">{category}</Typography>}
      />
      <CardMedia
        image={imageUrl}
        // todo make this responsive
        className={classes.cardMedia}
      />
      <CardContent>
        <Typography variant="body1" className={classes.location}>
          <div className={classes.address}>{address}</div>
          <div className={classes.distance}>{distance}</div>
        </Typography>
        <Divider />
        <div className={classes.chipWrapper}>
          {chipRenderer()}
          {filters.length > 5 ? (
            <Chip
              color="secondary"
              variant="outlined"
              label={`+${filters.length - 5} More`}
              className={classes.filter}
            />
          ) : (
            ''
          )}
        </div>
        <div>
          <Button color="secondary">Call Space</Button>
          <Button color="secondary">Write a review</Button>
          <ShareIcon
            color="secondary"
            size="small"
            className={classes.shareButton}
          />
        </div>
      </CardContent>
    </Card>
  );
};

BusinessCard.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  averageRating: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  imageUrl: PropTypes.string,
  address: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }),
};

BusinessCard.defaultProps = {
  // TODO: add a default url,
  imageUrl: '',
  filters: [],
};

export default withStyles(styles)(BusinessCard);
