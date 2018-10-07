import * as React from 'react';
import {CommentComponent} from './CommentComponent';
import {DocAnnotation} from '../DocAnnotation';
import {AnnotationType} from '../../metadata/AnnotationType';

/**
 * A generic wrapper that determines which sub-component to render.
 */
export class ChildAnnotationSection extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {};

    }

    public render() {

        const { children } = this.props;

        const result: any = [];

        children.map(child => {

            if (child.annotationType === AnnotationType.COMMENT) {
                result.push (<CommentComponent key={child.id} comment={child}/>);
            } else {
                result.push (<div>its a flashcard</div>);
            }


        });

        return result;

    }

}
interface IProps {
    children: DocAnnotation[];
}

interface IState {

}

