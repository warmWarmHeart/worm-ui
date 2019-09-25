import React, { Component, createElement } from 'react';

export default function carCreateElement(map) {
    const { type, props, content } = map;
    return  (
        createElement(type, props, content)
    );
};

