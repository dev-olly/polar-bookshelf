import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import PopoverBody from 'reactstrap/lib/PopoverBody';
import {UncontrolledPopover} from 'reactstrap';
import {AccountProvider} from "../../../../web/js/accounts/AccountProvider";
import {RendererAnalytics} from "../../../../web/js/ga/RendererAnalytics";
import {DropdownChevron} from "../../../../web/js/ui/util/DropdownChevron";
import {Callback} from "polar-shared/src/util/Functions";
import {GiftIcon} from "./GiftIcon";
import { Link } from 'react-router-dom';

interface ButtonProps {
    readonly onClick: Callback;
}

export const UpgradePromotionCopy = (props: ButtonProps) => {

    return (
        <div className="text-center text-md">

            <div className="mt-3 mb-3">
                <div style={{
                         width: '200px'
                     }}
                     className="ml-auto mr-auto">
                    <GiftIcon/>
                </div>
            </div>

            <h2>Get Polar Bronze for 66% Off</h2>

            <h4>Save $39 on a 1 year subscription</h4>

            <p>
                Offer includes mobile flashcard review, related tags, and increased storage!
            </p>

            <p className="text-muted">$19.95 for 12 months vs $59.88. Offer Valid until Dec 25</p>

            <p>

                <Link to={{pathname: '/', hash: '#plans-year'}}>
                    <Button color="success"
                            size="lg"
                            onClick={() => props.onClick()}>
                        Claim my Discount
                    </Button>
                </Link>

            </p>

        </div>
    );

};

export class UpgradePromotionButton extends React.PureComponent<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.onUpgrade = this.onUpgrade.bind(this);
    }

    public render() {

        const account = AccountProvider.get();

        if (account && account.plan === 'gold') {
            // already at max account level
            return null;
        }

        return (
            <div>

                <Button color="clear"
                        id="holiday-promotion-button"
                        size="md"
                        style={{
                            whiteSpace: 'nowrap',
                            backgroundColor: 'var(--indigo)',
                            color: 'var(--white)'
                        }}
                        className="pl-2 pr-2 border">

                    <i className="fas fa-gift"/> Holiday Promotion!

                    <DropdownChevron/>

                </Button>

                <UncontrolledPopover trigger="legacy"
                                     placement="bottom"
                                     target="holiday-promotion-button"
                                     delay={0}
                                     fade={false}
                                     style={{maxWidth: '600px'}}>

                    <PopoverBody className="shadow text-md">

                        <UpgradePromotionCopy onClick={() => this.onUpgrade()}/>

                    </PopoverBody>

                </UncontrolledPopover>

            </div>
        );

    }

    private onUpgrade() {
        RendererAnalytics.event({category: 'premium-promotion', action: 'xmas-2019'});
    }

}

interface IProps {
}

interface IState {

}