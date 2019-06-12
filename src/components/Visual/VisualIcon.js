import React from 'react';

import IPIcon from '../../asset/img/ip.svg';
import EarthIcon from '../../asset/img/earth.svg';
import DomainIcon from '../../asset/img/domain.svg'
import LabelIcon from '../../asset/img/label.svg'

export default function VisualIcon(props) {
        const iconMap = {
            root: DomainIcon,
            domain:  DomainIcon,
            ipMark: IPIcon,
            ip: EarthIcon,
            label: LabelIcon
        };
        let size = ['large', 'middle', 'small'].includes(props.size) ? props.size : 'middle';
        return <img className={`visual-panel__icon--${size}`} src={iconMap[props.type]} alt=""/>;
}