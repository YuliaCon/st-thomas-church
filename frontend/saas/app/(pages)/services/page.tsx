import './services.css';

import {notFound} from "next/navigation";
export default async function Services() {
    return(
        <section className={'service-times-page'}>
            <h1 className={'gradient-dark-header-large'}>SCHEDULE OF SERVICES</h1>
            <p> Hours and Divine Liturgy: <time> Sunday, 10:00am </time></p>
            <p><i> Please contact us for seasonal service schedules.</i></p>
        </section>
    )
}