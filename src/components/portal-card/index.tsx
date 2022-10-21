import React from 'react';
import { Button } from '@alifd/next';
import { createElement } from 'react';

export interface PortalCardProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

const PortalCard: React.FC<PortalCardProps> = (props) => {

  const { title, description, backgroundImage } = props;
  return (<div className="portal-card" style={{ background: `url(${backgroundImage})` }}>
    <div>
      {title}
    </div>
    <div>
      {description}
    </div>
    <div>
      <Button type="normal">详情3333</Button>
    </div>
  </div>)
}

PortalCard.defaultProps = {
  title: 'title',
  description: 'description',
}

export default PortalCard;
