import {KexWidgetSetting} from "../../modules/settings/models/kex-settings.model";
import {KexWidgetContactDataComponent} from "../../modules/home/components/widgets/kex-widget-contact-data/kex-widget-contact-data.component";
import {KexWidgetSkillsComponent} from "../../modules/home/components/widgets/kex-widget-skills/kex-widget-skills.component";
import {KexWidgetExperienceComponent} from "../../modules/home/components/widgets/kex-widget-experience/kex-widget-experience.component";
import {KexWidgetFeedbackComponent} from "../../modules/home/components/widgets/kex-widget-feedback/kex-widget-feedback.component";
import {
  KexWidgetFavoriteUserComponent
} from "../../modules/home/components/widgets/kex-widget-favorite-user/kex-widget-favorite-user.component";

export const kexWidgetSettingsConfig : KexWidgetSetting[] = [
  {
    name: 'TOP_SKILLS',
    label: 'Deine Top-Fähigkeiten',
    order: 1,
    component: KexWidgetSkillsComponent
  },
  {
    name: 'LAST_EXPERIENCE',
    label: 'Deine zuletzt hinzugefügten Erfahrungen',
    order: 2,
    component: KexWidgetExperienceComponent
  },
  {
    name: 'CONTACT_DATA',
    label: 'Deine Kontaktdaten',
    order: 3,
    component: KexWidgetContactDataComponent
  },
  {
    name: 'FEEDBACK',
    label: 'Gib uns Feedback',
    order: 4,
    component: KexWidgetFeedbackComponent
  },
  {
    name: 'USER_WATCHLIST',
    label: 'Gemerkte Benutzer',
    order: 5,
    component: KexWidgetFavoriteUserComponent
  }
]
