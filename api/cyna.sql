--
-- Déchargement des données de la table `media_object`
--

INSERT INTO `media_object` (`id`, `file_path`, `updated_at`) VALUES
(4, 'homepage1-680f542f724f3145010968.jpg', '2025-04-28 10:10:55'),
(5, 'homepage2-680f54914d019333064088.jpg', '2025-04-28 10:12:33'),
(7, 'homepage3-680f589e06706317223470.jpg', '2025-04-28 10:29:50'),
(8, 'categorie1-680f7be9ecca7779861015.jpg', '2025-04-28 13:00:25'),
(9, 'categorie2-680f7c166c14b531277402.jpg', '2025-04-28 13:01:10'),
(10, 'categorie3-680f7c2079232216318963.jpg', '2025-04-28 13:01:20'),
(11, 'diagnosticcyber-680f7c4616dc0210900155.jpg', '2025-04-28 13:01:58'),
(12, 'testintrusion-680f7c50cca7f198006642.jpg', '2025-04-28 13:02:08'),
(20, 'microsocpro-680f7d79269ab874613478.jpg', '2025-04-28 13:07:05'),
(21, 'socmanagepro-680f7d87c0fb6757289191.jpg', '2025-04-28 13:07:19'),
(22, 'investionpro-680f7d8e8d6b9980203729.jpg', '2025-04-28 13:07:26'),
(23, 'diagnosticcyberpro-680f7ea768cb5749583404.jpg', '2025-04-28 13:12:07'),
(24, 'testintrusionpro-680f7eb0b913a370235828.png', '2025-04-28 13:12:16'),
(26, 'microsoc-680f7faa4a715572131737.png', '2025-04-28 13:16:26'),
(30, 'investigation-680f80f0e50f6210903066.png', '2025-04-28 13:21:52'),
(31, 'socmanage-680f829be82f9192651889.png', '2025-04-28 13:28:59'),
(32, 'dashboard-680f878e4115e099652151.jpg', '2025-04-28 13:50:06');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `image_id`, `priority`) VALUES
(1, 8, 1),
(2, 9, 2),
(3, 10, 3);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `category_translation`
--

INSERT INTO `category_translation` (`id`, `category_id`, `name`, `description`, `locale_id`) VALUES
(1, 1, 'Prévention', 'La prévention vise à identifier et corriger les vulnérabilités avant qu’un attaquant ne puisse en tirer parti.', 'fr-FR'),
(2, 1, 'Prevention', 'Prevention aims to identify and correct vulnerabilities before an attacker can take advantage of them.', 'en-GB'),
(3, 1, 'وقاية', 'تهدف الوقاية إلى تحديد نقاط الضعف وتصحيحها قبل أن يتمكن المهاجم من الاستفادة منها.', 'ar-SA'),
(4, 2, 'Protection', 'La protection consiste à déployer des dispositifs et des services continus pour repousser les menaces et surveiller votre environnement en temps réel.', 'fr-FR'),
(5, 2, 'Protection', 'Protection involves deploying continuous devices and services to repel threats and monitor your environment in real time.', 'en-GB'),
(6, 2, 'حماية', 'تتضمن الحماية نشر أجهزة وخدمات مستمرة لصد التهديدات ومراقبة بيئتك في الوقت الفعلي.', 'ar-SA'),
(7, 3, 'Réponse', 'La réponse intervient lorsque l’incident est avéré : nous enquêtons, éradiquons la menace et remettons votre environnement en état de fonctionnement sécurisé.', 'fr-FR'),
(8, 3, 'Response', 'The response comes when the incident is confirmed: we investigate, eradicate the threat and restore your environment to a secure operating state.', 'en-GB'),
(9, 3, 'إجابة', 'يأتي الرد عندما يتم تأكيد الحادث: نقوم بالتحقيق والقضاء على التهديد واستعادة بيئتك إلى حالة تشغيل آمنة.', 'ar-SA');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `promotional_code`
--

INSERT INTO `promotional_code` (`id`, `name`, `promotion`, `is_percent`) VALUES
(1, 'Cyna1000', 1000, 0),
(2, 'Cyna20', 20, 1);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `homepage`
--

INSERT INTO `homepage` (`id`, `text`, `locale`) VALUES
(4, 'Bénéficiez d’une expertise reconnue en cybersécurité, alliée à une réactivité immédiate et à un accompagnement de proximité pour garantir une protection optimale et durable de votre système d’information.\nChez Cyna, nous vous aidons à anticiper, détecter et neutraliser les menaces grâce à des solutions sur mesure adaptées à vos enjeux métiers.\nNotre approche intègre le diagnostic, le test d’intrusion, la surveillance en temps réel (SOC, XDR) ainsi que l’investigation et la réponse aux incidents pour assurer la continuité de vos activités.\nAvec Cyna, vous bénéficiez d’une sécurité proactive et d’une équipe d’experts mobilisée à chaque étape pour renforcer la résilience de votre entreprise face aux cybermenaces.', 'fr-FR'),
(5, "Benefit from recognized cybersecurity expertise, immediate responsiveness, and close support to ensure optimal and lasting protection of your information system.\nAt Cyna, we help you anticipate, detect, and neutralize threats with tailor-made solutions adapted to your business challenges.\nOur approach includes diagnostics, penetration testing, real-time monitoring (SOC, XDR), as well as investigation and incident response to ensure the continuity of your operations.\nWith Cyna, you benefit from proactive security and a team of experts committed at every step to strengthening your company's resilience against cyber threats.", 'en-GB'),
(6, 'استفد من خبرة معترف بها في مجال الأمن السيبراني، واستجابة فورية، ودعم قريب لضمان حماية مثلى ودائمة لنظام المعلومات الخاص بك.\nفي Cyna، نساعدك على التنبؤ بالتهديدات واكتشافها وتحليلها والقضاء عليها من خلال حلول مخصصة تتناسب مع تحديات عملك.\nتشمل منهجيتنا التشخيص، واختبار الاختراق، والمراقبة الفورية (SOC، XDR)، بالإضافة إلى التحقيق والاستجابة للحوادث لضمان استمرارية عملياتك.\nمع Cyna، تستفيد من حماية استباقية وفريق خبراء ملتزم بمرافقتك في كل مرحلة لتعزيز مرونة شركتك ضد التهديدات السيبرانية.', 'ar-SA');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `slide`
--

INSERT INTO `slide` (`id`, `image_id`, `homepage_id`, `title`) VALUES
(5, 4, 4, 'Sécurisez Votre Système d’Information avec Cyna'),
(6, 5, 4, 'Cyna protège les entreprises contre les cyberattaques'),
(8, 7, 4, 'Nous plaçons vos priorités au cœur de notre mission'),
(9, 4, 5, 'Secure Your Information System with Cyna'),
(10, 5, 5, 'Cyna protects businesses against cyberattacks'),
(11, 7, 5, 'We place your priorities at the heart of our mission'),
(12, 4, 6, 'Cyna تأمين نظام المعلومات الخاص بك مع '),
(13, 5, 6, 'تحمي شركة Cyna الشركات من الهجمات الإلكترونية'),
(14, 7, 6, 'نحن نضع أولوياتك في قلب مهمتنا');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `position`, `category_id`, `price`, `priority`, `disponibility`, `top_product`, `image_id`, `promotion_active`, `promotion_label`, `promotion_price`) VALUES
(1, 1, 1, 4500, 1, 1, 1, 11, 0, NULL, NULL),
(2, 0, 1, 4000, NULL, 1, 0, 12, 1, '20%', 3200),
(3, 0, 1, 6000, 3, 1, 0, 23, 0, NULL, NULL),
(4, 2, 1, 5500, 4, 0, 1, 24, 1, '-50%', 2250),
(5, 0, 2, 5000, NULL, 1, 1, 26, 0, NULL, NULL),
(6, 0, 2, 7000, 5, 1, 1, 20, 1, 'PROMO - 1000€', 5997),
(7, 0, 2, 7000, NULL, 0, 0, 31, 1, '-50%', 3500),
(8, 0, 2, 8990, 7, 1, 0, 21, 0, NULL, NULL),
(9, 0, 3, 8500, 7, 1, 0, 30, 0, NULL, NULL),
(10, 0, 3, 10000, NULL, 0, 0, 22, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `product_image`
--

INSERT INTO `product_image` (`id`, `image_id`, `product_id`, `alt`) VALUES
(1, 11, 1, 'Diagnostic Cyber Image'),
(2, 12, 2, 'Test Intrusion'),
(3, 23, 3, 'Diagnostic Cyber Pro Image'),
(4, 24, 4, 'Test Intrusion Pro Image '),
(5, 26, 5, 'Micro SOC Image'),
(6, 20, 6, 'Micro SOC Pro Image'),
(7, 31, 7, 'SOC Manage Image '),
(8, 21, 8, 'SOC Manage Pro Image'),
(9, 30, 9, 'Reponse Image '),
(10, 32, 1, 'Dashboard Image'),
(11, 32, 2, 'Dashboard Image'),
(12, 32, 3, 'Dashboard Image'),
(13, 32, 4, 'Dashboard Image'),
(14, 32, 5, 'Dashboard Image'),
(15, 32, 6, 'Dashboard Image'),
(16, 32, 7, 'Dashboard Image'),
(17, 32, 8, 'Dashboard Image'),
(18, 32, 9, 'Dashboard Image'),
(19, 22, 10, 'Test Intrusion Pro Image '),
(20, 32, 10, 'Dashboard Image');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `product_translation`
--

INSERT INTO `product_translation` (`id`, `product_id`, `name`, `caracteristic`, `locale_id`, `description`) VALUES
(1, 1, 'Diagnostic Cyber', '<ul><li><p><span style=\"color: rgb(33, 33, 33)\">Audit architecture &amp; configAudit architecture &amp; config</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Tests d’intrusion manuel</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Rapport priorisé &amp; plan d’action</span></p></li></ul>', 'fr-FR', 'Le Diagnostic Cyber Standard propose un audit initial de votre infrastructure et de vos processus de sécurité. Nos outils automatisés scannent vos réseaux, applications et configurations pour repérer les vulnérabilités courantes. Vous recevez un rapport clair avec les points faibles prioritaires et des recommandations générales. Idéal pour poser une première base de protection.'),
(2, 1, 'Diagnostic Cyber', '<ul><li><p>Architecture &amp; config auditArchitecture &amp; config audit</p></li><li><p>Manual penetration testing</p></li><li><p>Prioritized report &amp; action plan</p></li></ul>', 'en-GB', "The Standard Cyber ​​Diagnostic provides an initial audit of your security infrastructure and processes. Our automated tools scan your networks, applications, and configurations to identify common vulnerabilities. You\'ll receive a clear report with prioritized weaknesses and general recommendations. This is ideal for laying a foundation for protection."),
(3, 1, 'التشخيص السيبراني', "<ul><li><p>تكوين الهندسة المعمارية والتدقيقتكوين الهندسة المعمارية والتدقيق</p></li><li><p>اختبار الاختراق اليدوي</p></li><li><p>تقرير وخطة عمل ذات أولوية</p></li></ul>", 'ar-SA', "يوفر التشخيص السيبراني القياسي تدقيقًا أوليًا للبنية التحتية الأمنية والعمليات الخاصة بك. تقوم أدواتنا الآلية بفحص شبكاتك وتطبيقاتك وتكويناتك لتحديد نقاط الضعف الشائعة. سوف تتلقى تقريرًا واضحًا يتضمن نقاط الضعف ذات الأولوية والتوصيات العامة. وهذا مثالي لوضع الأساس للحماية."),
(4, 2, 'Test Intrusion', '<ul><li><p><span style=\"color: rgb(0, 0, 0)\">Audit architecture &amp; config</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Tests d’intrusion manuel</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Rapport priorisé &amp; plan d’action</span></p></li></ul>', 'fr-FR', 'Le Test d’intrusion Standard englobe des attaques simulées basées sur des scénarios courants et des outils semi-automatiques. Nos pentesteurs explorent les failles accessibles pour évaluer le niveau de risque et la surface d’attaque. Un rapport synthétique présente les vulnérabilités exploitées, leur criticité et des conseils de remédiation. C’est un bon moyen de vérifier l’efficacité de vos défenses de base.'),
(5, 2, 'Intrusion Test', '<ul><li><p>Architecture &amp; config audit</p></li><li><p>Manual penetration testing</p></li><li><p>Prioritized report &amp; action plan</p></li></ul>', 'en-GB', 'The Standard Penetration Test includes simulated attacks based on common scenarios and semi-automated tools. Our pentesters explore accessible vulnerabilities to assess the risk level and attack surface. A summary report presents the exploited vulnerabilities, their criticality, and remediation recommendations. This is a good way to verify the effectiveness of your basic defenses.'),
(6, 2, 'اختبار التطفل', '<ul><li><p>تدقيق البنية والتكوين</p></li><li><p>اختبار الاختراق اليدوي</p></li><li><p>تقرير وخطة عمل مُحددة الأولويات</p></li></ul>', 'ar-SA', 'يتضمن اختبار الاختراق القياسي محاكاة هجمات مبنية على سيناريوهات شائعة وأدوات شبه آلية. يستكشف مختبرو الاختراق لدينا الثغرات الأمنية المتاحة لتقييم مستوى الخطر ومساحة الهجوم. يعرض تقرير موجز الثغرات المستغلة وخطورتها وتوصيات معالجتها. تُعد هذه طريقة جيدة للتحقق من فعالية دفاعاتك الأساسية.'),
(7, 3, 'Diagnostic Cyber Pro', '<ul><li><p><span style=\"color: rgb(0, 0, 0)\">Audit architecture &amp; config</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Tests d’intrusion manuel</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Rapport priorisé &amp; plan d’action</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Recommandations opérationnelles</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Validation post-corrections</span></p></li><li><p><span style=\"color: rgb(0, 0, 0)\">Atelier de restitution client</span></p></li></ul>', 'fr-FR', 'La version Pro va plus loin en associant l’audit automatisé à une revue manuelle par un expert senior. Nous réalisons des ateliers dédiés pour expliquer en détail chaque risque et co-construire des plans d’action adaptés à votre contexte. Un suivi post-implémentation (retest) et une session Q&A sont inclus pour valider la mise en œuvre des correctifs. Vous bénéficiez ainsi d’une prise en charge complète et personnalisée.'),
(8, 3, 'Diagnostic Cyber Pro', '<ul><li><p>Architecture &amp; Configuration Audit</p></li><li><p>Manual Penetration Testing</p></li><li><p>Prioritized Report &amp; Action Plan</p></li><li><p>Operational Recommendations</p></li><li><p>Post-Correction Validation</p></li><li><p>Customer Feedback Workshop</p></li></ul>', 'en-GB', 'The Pro version goes further by combining automated auditing with a manual review by a senior expert. We conduct dedicated workshops to explain each risk in detail and co-develop action plans tailored to your context. Post-implementation follow-up (retest) and a Q&A session are included to validate the implementation of fixes. This gives you comprehensive, personalized support.'),
(9, 3, 'تشخيص سايبر برو', '<ul><li><p>تدقيق البنية والتكوين</p></li><li><p>اختبار الاختراق اليدوي</p></li><li><p>تقرير وخطة عمل مُحددة الأولويات</p></li><li><p>توصيات تشغيلية</p></li><li><p>التحقق بعد التصحيح</p></li><li><p>ورشة عمل لملاحظات العملاء</p></li></ul>', 'ar-SA', 'يتخطى الإصدار الاحترافي حدود التدقيق الآلي من خلال الجمع بين التدقيق الآلي والمراجعة اليدوية التي يجريها خبير متخصص. نُجري ورش عمل متخصصة لشرح كل خطر بالتفصيل، ونشارك في وضع خطط عمل مُصممة خصيصًا لسياقك. يتضمن البرنامج متابعة ما بعد التنفيذ (إعادة اختبار) وجلسة أسئلة وأجوبة للتحقق من صحة تطبيق الحلول. هذا يمنحك دعمًا شاملًا ومُخصصًا.'),
(10, 4, 'Test Intrusion Pro', '<ul><li><p>Audit architecture &amp; config</p></li><li><p>Tests d’intrusion manuel</p></li><li><p>Rapport priorisé &amp; plan d’action</p></li><li><p>Recommandations opérationnelles</p></li><li><p>Validation post-corrections</p></li><li><p>Atelier de restitution client</p></li></ul>', 'fr-FR', 'Le Test d’intrusion Pro inclut des phases approfondies de reconnaissance, d’exploitation manuelle et de contournement de dispositifs avancés. Nos experts réalisent des exploits sur mesure et testent les réactions de vos équipes en conditions réalistes. Le livrable détaille les scénarios d’attaque, les preuves d’exploitation et un plan d’actions opérationnel pour chaque faille. Un débriefing interactif et un workshop de renforcement complètent l’offre.'),
(11, 4, 'Test Intrusion Pro', '<ul><li><p>Architecture &amp; Configuration Audit</p></li><li><p>Manual Penetration Testing</p></li><li><p>Prioritized Report &amp; Action Plan</p></li><li><p>Operational Recommendations</p></li><li><p>Post-Correction Validation</p></li><li><p>Customer Feedback Workshop</p></li></ul>', 'en-GB', "The Pro Penetration Test includes in-depth reconnaissance, manual exploitation, and advanced device bypass phases. Our experts perform customized exploits and test your teams\' reactions under realistic conditions. The deliverable details attack scenarios, evidence of exploitation, and an operational action plan for each vulnerability. An interactive debriefing and a reinforcement workshop complete the offering."),
(12, 4, 'اختبار التطفل المحترف', '<ul><li><p>تدقيق البنية والتكوين</p></li><li><p>اختبار الاختراق اليدو</p></li><li><p>تقرير وخطة عمل مُحددة الأولويات</p></li><li><p>توصيات تشغيلية</p></li><li><p>التحقق بعد التصحيح</p></li><li><p>ورشة عمل لملاحظات العملاء</p></li></ul>', 'ar-SA', 'يتضمن اختبار الاختراق الاحترافي استطلاعًا متعمقًا، واستغلالًا يدويًا، ومراحل متقدمة لتجاوز الأجهزة. يُجري خبراؤنا عمليات استغلال مُخصصة، ويختبرون ردود فعل فرقكم في ظل ظروف واقعية. تُفصّل النتائج سيناريوهات الهجوم، وأدلة الاستغلال، وخطة عمل تشغيلية لكل ثغرة. ويُكمل العرض جلسة استماع تفاعلية وورشة عمل تعزيزية.'),
(13, 5, 'Micro SOC ', '<ul><li><p>Collecte et corrélation basique des logs</p></li><li><p>Tableau de bord centralisé</p></li><li><p>Rapports hebdomadaires</p></li></ul>', 'fr-FR', 'Le Micro SOC Standard déploie une solution locale compacte pour collecter et corréler automatiquement vos journaux (firewalls, serveurs, endpoints). Vous accédez à un tableau de bord centralisé pour visualiser vos alertes critiques en temps réel. Des rapports hebdomadaires synthétisent les événements majeurs et proposent des recommandations de sécurité. Idéal pour les petites structures souhaitant une visibilité accrue.'),
(14, 5, 'Micro SOC ', '<ul><li><p>Basic log collection and correlation</p></li><li><p>Centralized dashboard</p></li><li><p>Weekly reports</p></li></ul>', 'en-GB', 'The Micro SOC Standard deploys a compact, on-premises solution to automatically collect and correlate your logs (firewalls, servers, endpoints). You access a centralized dashboard to view your critical alerts in real time. Weekly reports summarize major events and offer security recommendations. Ideal for smaller organizations looking for increased visibility.'),
(15, 5, 'مايكرو SOC', '<ul><li><p>جمع السجلات الأساسية وربطها</p></li><li><p>لوحة معلومات مركزية</p></li><li><p>تقارير أسبوعية</p></li></ul>', 'ar-SA', 'يُطبّق معيار Micro SOC حلاً مدمجاً محلياً لجمع سجلاتك (جدران الحماية، الخوادم، نقاط النهاية) وربطها تلقائياً. يمكنك الوصول إلى لوحة معلومات مركزية لعرض تنبيهاتك المهمة في الوقت الفعلي. تُلخّص التقارير الأسبوعية الأحداث الرئيسية وتُقدّم توصيات أمنية. مثالي للمؤسسات الصغيرة التي تبحث عن رؤية أوضح.'),
(16, 6, 'Micro SOC Pro', '<ul><li><p>Règles de corrélation avancées</p></li><li><p>Intégration de threat intelligence</p></li><li><p>Tuning d’alertes personnalisé</p></li><li><p>Reporting réglementaire automatisé</p></li><li><p>Support 24/7 avec SLA</p></li></ul>', 'fr-FR', 'La version Pro s’appuie sur le socle Standard en y ajoutant des règles de corrélation avancées et l’intégration de flux de threat intelligence externes. Vous bénéficiez d’un tuning personnalisé des alertes, d’un reporting réglementaire automatisé (RGPD, ISO 27001) et d’un support 24/7 avec SLA garanti. Un atelier de parametrage initial et un audit post-déploiement sont inclus pour optimiser vos défenses.'),
(17, 6, 'Micro SOC Pro', '<ul><li><p>Advanced correlation rules</p></li><li><p>Threat intelligence integration</p></li><li><p>Custom alert tuning</p></li><li><p>Automated regulatory reporting</p></li><li><p>24/7 support with SLA</p></li></ul>', 'en-GB', 'The Pro version builds on the Standard foundation by adding advanced correlation rules and the integration of external threat intelligence feeds. You benefit from personalized alert tuning, automated regulatory reporting (GDPR, ISO 27001), and 24/7 support with guaranteed SLAs. An initial configuration workshop and a post-deployment audit are included to optimize your defenses.'),
(18, 6, 'مايكرو SOC برو', '<ul><li><p>قواعد ارتباط متقدمة</p></li><li><p>تكامل استخبارات التهديدات</p></li><li><p>ضبط التنبيهات حسب الطلب</p></li><li><p>تقارير تنظيمية آلية</p></li><li><p>دعم فني على مدار الساعة طوال أيام الأسبوع مع اتفاقية مستوى الخدمة</p></li></ul>', 'ar-SA', 'يعتمد الإصدار الاحترافي على الإصدار القياسي بإضافة قواعد ارتباط متقدمة ودمج موجزات معلومات التهديدات الخارجية. ستستفيد من ضبط التنبيهات الشخصية، وإعداد التقارير التنظيمية الآلية (وفقًا للوائح العامة لحماية البيانات، ومعيار ISO 27001)، ودعم فني على مدار الساعة طوال أيام الأسبوع مع اتفاقيات مستوى خدمة مضمونة. يتضمن الإصدار ورشة عمل أولية للتكوين وتدقيقًا بعد النشر لتحسين دفاعاتك.'),
(19, 7, 'SOC Manage ', '<ul><li><p>Surveillance 24/7 en cloud</p></li><li><p>Traitement des alertes critiques</p></li><li><p>Rapport mensuel de tendances</p></li></ul>', 'fr-FR', 'Le SOC Managé Standard assure une surveillance continue de votre infrastructure via un centre d’opérations en cloud. Nos analysts reçoivent et traitent vos alertes, puis vous informent immédiatement en cas d’incident critique. Un rapport mensuel décrit les tendances détectées et propose des pistes d’amélioration. Solution clé en main pour externaliser votre surveillance sécurité.'),
(20, 7, 'SOC Manage ', '<ul><li><p>24/7 cloud-based monitoring</p></li><li><p>Critical alert processing</p></li><li><p>Monthly trend reports</p></li></ul>', 'en-GB', 'The Standard Managed SOC provides continuous monitoring of your infrastructure via a cloud operations center. Our analysts receive and process your alerts, then immediately notify you in the event of a critical incident. A monthly report describes detected trends and suggests areas for improvement. A turnkey solution for outsourcing your security monitoring.'),
(21, 7, 'إدارة مركز العمليات الأمنية', '<ul><li><p>مراقبة سحابية على مدار الساعة</p></li><li><p>معالجة التنبيهات الحرجة</p></li><li><p>تقارير شهرية عن الاتجاهات</p></li></ul>', 'ar-SA', 'يوفر مركز العمليات الأمنية المُدار القياسي مراقبةً مستمرةً لبنيتك التحتية عبر مركز عمليات سحابي. يتلقى محللونا تنبيهاتك ويعالجونها، ثم يُبلغونك فورًا في حال وقوع حادث خطير. يصف تقرير شهري الاتجاهات المُكتشفة ويقترح مجالات التحسين. حل جاهز للاستعانة بمصادر خارجية لمراقبة أمنك.'),
(22, 8, 'SOC Manage Pro', '<ul><li><p>Threat hunting régulier</p></li><li><p>Analyses forensiques approfondies</p></li><li><p>Portail client avec reporting interactif</p></li><li><p>Revue trimestrielle stratégique</p></li><li><p>Tests de procédures et formation</p></li></ul>', 'fr-FR', 'Au-delà du Standard, le SOC Managé Pro inclut des campagnes régulières de threat hunting et d’analyses forensiques poussées. Vous bénéficiez de points de contact dédiés, de comptes rendus détaillés via un portail client et d’un cycle de revue trimestrielle avec recommandations stratégiques. Nos équipes interviennent également pour tester vos procédures d’incident et former vos collaborateurs.'),
(23, 8, 'SOC Manage Pro', '<ul><li><p>Regular threat hunting</p></li><li><p>In-depth forensic analysis</p></li><li><p>Client portal with interactive reporting</p></li><li><p>Quarterly strategic review</p></li><li><p>Procedure testing and training</p></li></ul>', 'en-GB', 'Beyond Standard, the Managed SOC Pro includes regular threat hunting campaigns and in-depth forensic analysis. You benefit from dedicated points of contact, detailed reports via a customer portal, and a quarterly review cycle with strategic recommendations. Our teams also work to test your incident procedures and train your employees.'),
(24, 8, 'إدارة مركز العمليات الأمنية الاحترافية', '<ul><li><p>رصد التهديدات بانتظام</p></li><li><p>تحليل جنائي متعمق</p></li><li><p>بوابة عملاء مع تقارير تفاعلية</p></li><li><p>مراجعة استراتيجية ربع سنوية</p></li><li><p>اختبار الإجراءات والتدريب عليها</p></li></ul>', 'ar-SA', 'بالإضافة إلى المعايير القياسية، يتضمن برنامج Managed SOC Pro حملات دورية لرصد التهديدات وتحليلات جنائية معمقة. ستستفيد من نقاط اتصال مخصصة، وتقارير مفصلة عبر بوابة العملاء، ودورة مراجعة ربع سنوية تتضمن توصيات استراتيجية. كما تعمل فرقنا على اختبار إجراءات التعامل مع الحوادث وتدريب موظفيك.'),
(25, 9, 'Investigation, Éradication, Remédiation', '<ul><li><p>Analyse forensique initiale</p></li><li><p>Éradication des maliciels et comptes compromis</p></li><li><p>Plan de remédiation opérationnel</p></li></ul>', 'fr-FR', 'La réponse Standard couvre l’investigation initiale et l’éradication des menaces détectées. Nos experts réalisent une analyse forensique pour retracer l’origine et l’impact, puis suppriment maliciels et accès non autorisés. Vous recevez des recommandations de remédiation (patchs, configurations) pour restaurer un environnement sécurisé. Convient aux interventions urgentes à l’échelle opérationnelle.'),
(26, 9, 'Investigation, investigation, remediation', '<ul><li><p>Initial forensic analysis</p></li><li><p>Malware removal and compromised accounts</p></li><li><p>Operational remediation plan</p></li></ul>', 'en-GB', 'The Standard Response covers the initial investigation and eradication of detected threats. Our experts perform a forensic analysis to trace the origin and impact, then remove malware and unauthorized access. You receive remediation recommendations (patches, configurations) to restore a secure environment. Suitable for urgent interventions at an operational scale.'),
(27, 9, 'التحقيق، التحقيق، العلاج', '<ul><li><p>التحليل الجنائي الأولي</p></li><li><p>إزالة البرامج الضارة والحسابات المخترقة</p></li><li><p>خطة المعالجة التشغيلية</p></li></ul>', 'ar-SA', 'تشمل الاستجابة القياسية التحقيق الأولي والقضاء على التهديدات المكتشفة. يُجري خبراؤنا تحليلًا جنائيًا لتتبع مصدرها وتأثيرها، ثم إزالة البرامج الضارة والوصول غير المصرح به. ستتلقى توصيات بالإصلاح (التصحيحات والتكوينات) لاستعادة بيئة آمنة. مناسب للتدخلات العاجلة على نطاق تشغيلي.'),
(28, 10, 'Investigation, éradication, remédiation Pro', '<ul><li><p>Root cause analysis détaillé</p></li><li><p>Workshop de remédiation et formation</p></li><li><p>Suivi post-incident (retest à J+30)</p></li><li><p>Rapport stratégique et sessions de restitution</p></li></ul>', 'fr-FR', 'La version Pro ajoute un volet de root cause analysis approfondi, un workshop de remédiation en direct et un suivi post-incident à J+30 pour valider l’efficacité des correctifs. Chaque étape est documentée via un rapport détaillé, incluant des sessions de restitution pour vos équipes et des recommandations stratégiques visant à renforcer votre résilience.'),
(29, 10, 'Investigation, eradication, remediation Pro', '<ul><li><p>Detailed root cause analysis</p></li><li><p>Remediation workshop and training</p></li><li><p>Post-incident follow-up (retest at 30 days)</p></li><li><p>Strategic report and feedback sessions</p></li></ul>', 'en-GB', 'The Pro version adds an in-depth root cause analysis component, a live remediation workshop, and a 30-day post-incident follow-up to validate the effectiveness of fixes. Each step is documented in a detailed report, including feedback sessions for your teams and strategic recommendations to strengthen your resilience.'),
(30, 10, 'التحقيق والاستئصال والمعالجة', '<ul><li><p>تحليل مفصل للأسباب الجذرية</p></li><li><p>ورشة عمل وتدريب على المعالجة</p></li><li><p>متابعة ما بعد الحادث (إعادة اختبار بعد 30 يومًا)</p></li><li><p>جلسات إعداد التقارير الاستراتيجية وجلسات التقييم</p></li></ul>', 'ar-SA', 'يضيف الإصدار الاحترافي تحليلًا متعمقًا للسبب الجذري، وورشة عمل مباشرة للمعالجة، ومتابعة لمدة 30 يومًا بعد الحادث للتحقق من فعالية الحلول. تُوثّق كل خطوة في تقرير مفصل، يتضمن جلسات تقييم لفرقكم وتوصيات استراتيجية لتعزيز مرونتكم.');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `is_email_verified`, `stripe_customer_id`, `two_fa_code`, `two_fa_expires_at`, `created_at`, `updated_at`, `is_prenium`, `subscription_id`) VALUES
(19, 'user@user.com', '[\"ROLE_USER\"]', '$2y$13$4K2i.0Qjxxiz66cdw9p9yu6segprkwYbH9ANmf3avRv5Nn68sm4se', 'user', 'user', 1, 'cus_Rz3caLIaRQlQsN', NULL, NULL, '2025-02-03 20:29:53', '2025-02-03 20:29:53', 0, NULL);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `user_id`, `firstname`, `lastname`, `address1`, `address2`, `city`, `county`, `postal_code`, `country`, `phone`) VALUES
(1, 1, 'admin', 'admin', '2 Avenue du générale Foch', NULL, 'Paris', 'île-de-france', '75000', 'France', '0657367526'),
(2, 19, 'user', 'user', '1 rue de la paix', NULL, 'Paris', 'île-de-france', '75000', 'France', '0657367526'),
(3, 19, 'user', 'user', '1 rue des roses', '', 'Paris', 'Île-de-france', '75000', 'France', '0698458735');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `payment_method`
--

INSERT INTO `payment_method` (`id`, `user_id`, `stripe_payment_method_id`, `last4`, `brand`, `expiry_month`, `expiry_year`) VALUES
(10, 1, 'pm_1QmfysHdav6xRf1DJ5A6sZMd', '4242', 'visa', '4', '2029'),
(12, 19, 'pm_1R55VdHdav6xRf1DTS92F1OQ', '4242', 'visa', '2', '2027');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `email`, `subject`, `message`, `send_at`) VALUES
(1, 'user@user.com', "Demande d\'information sur vos services de cybersécurité", "Bonjour,\n\nJe suis intéressé(e) par vos services de cybersécurité pour mon entreprise. Pourriez-vous m\'envoyer plus d\'informations sur les solutions que vous proposez, ainsi que les tarifs et les modalités d\'abonnement ?\n\nMerci par avance pour votre retour.", '2025-01-20 20:23:24'),
(2, 'user@user.com', 'Demande de devis pour un audit de sécurité', 'Bonjour,\n\nNous aimerions obtenir un devis pour un audit complet de la sécurité de notre infrastructure informatique. Pourriez-vous nous communiquer les étapes du processus ainsi que les coûts associés ?\n\nMerci de votre réactivité.', '2025-01-20 20:26:46'),
(3, 'test@test.fr', 'Problème de sécurité à résoudre', "Bonjour,\n\nNous rencontrons un problème de sécurité sur notre site web et avons besoin d\'assistance pour le résoudre rapidement. Pourriez-vous nous aider à identifier et corriger la vulnérabilité ?\n\nNous sommes disponibles pour discuter des détails si nécessaire.", '2025-03-08 16:27:30'),
(4, 'test@test.fr', 'Consultation sur la cybersécurité', "Bonjour,\n\nJe souhaite planifier une consultation avec un expert en cybersécurité pour évaluer les risques potentiels auxquels notre entreprise pourrait être exposée. Pourriez-vous m\'indiquer les disponibilités et les modalités de cette consultation ?\n\nDans l\'attente de votre réponse.", '2025-03-08 16:36:49');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `order`
--

INSERT INTO `order` (`id`, `user_id`, `reference`, `date`, `status`, `total`, `promotion`, `address`, `customer_name`, `customer_email`, `payment_method_id`) VALUES
(4, 19, 'order_67ec3a590a950', '2025-04-01 19:11:21', 'paid', 145.23, NULL, '1 rue des tests, 75000 Paris, France', 'test test', 'test@test.com', 12),
(5, 19, 'order_67ecf6769ef69', '2024-04-02 08:33:58', 'paid', 19.98, 100, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(6, 19, 'order_67f4d83a643ff', '2025-04-08 08:03:06', 'paid', 19.98, 100, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(7, 19, 'sub_67faa40dcdc3d', '2025-04-12 17:34:05', 'terminated', 499.99, NULL, '1 rue des tests, 75000 Paris, France', 'test test', 'test@test.com', 12),
(8, 19, 'order_67fb85f693cd0', '2025-04-13 09:37:58', 'paid', 13.98, 100, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(10, 19, 'order_6809313355bbe', '2025-04-23 18:28:03', 'paid', 19.98, 100, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(11, 19, 'order_68093616affa6', '2025-04-23 18:48:54', 'paid', 19.98, 100, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(12, 19, 'sub_680bc12c8d602', '2025-04-25 17:06:52', 'terminated', 49.99, NULL, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(13, 19, 'sub_680bc249dbb3f', '2025-04-25 17:11:37', 'active', 49.99, NULL, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(14, 19, 'order_680bc3a5a0c56', '2025-04-25 17:17:25', 'paid', 56.99, NULL, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(15, 19, 'sub_680bc437848ac', '2025-04-25 17:19:51', 'active', 49.99, NULL, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12),
(16, 19, 'sub_680bc49a24faf', '2025-04-25 17:21:30', 'terminated', 49.99, NULL, '1 rue de la paix, 75000 Paris, France', 'test test', 'test@test.com', 12);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `order_line`
--

INSERT INTO `order_line` (`id`, `order_ref_id`, `name`, `quantity`, `price`, `promotion_price`, `category`) VALUES
(4, 4, 'Mon produit de test', 2, 59.99, NULL, 'catégorie 1'),
(5, 4, 'Produit en promotion', 1, 50.5, 25.25, 'no category'),
(6, 5, 'Mon produit de test', 2, 59.99, NULL, 'catégorie 1'),
(7, 6, 'Mon produit de test', 2, 59.99, NULL, 'catégorie 1'),
(8, 7, 'Abonnement Annuel', 12, 499.99, NULL, 'Subscription'),
(9, 8, 'Mon produit de test', 2, 59.99, NULL, 'catégorie 1'),
(12, 10, 'Mon produit de test', 2, 59.99, NULL, 'catégorie 1'),
(13, 11, 'Mon produit de test', 2, 59.99, NULL, 'catégorie 1'),
(14, 12, 'Abonnement Mensuel', 1, 49.99, NULL, 'Subscription'),
(15, 13, 'Abonnement Mensuel', 1, 49.99, NULL, 'Subscription'),
(16, 14, 'Mon produit de test', 1, 59.99, NULL, 'catégorie 1'),
(17, 15, 'Abonnement Mensuel', 1, 49.99, NULL, 'Subscription'),
(18, 16, 'Abonnement Mensuel', 1, 49.99, NULL, 'Subscription');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `subscription`
--

INSERT INTO `subscription` (`id`, `title`, `subtitle`, `price`, `is_active`, `locale`, `duration`, `position`) VALUES
(1, 'Abonnement Mensuel', 'Idéal pour tester notre service', 49.99, 1, 'fr-FR', 1, 1),
(2, 'Abonnement Annuel', "Notre meilleure offre, économisez 2 mois d\'abonnement", 499.99, 1, 'fr-FR', 12, 2);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `subscription_caracteristic`
--

INSERT INTO `subscription_caracteristic` (`id`, `subscription_id`, `position`, `text`) VALUES
(1, 1, 1, "Économisez 5% sur l\'achat de service"),
(2, 1, 2, 'Support prioritaire premium'),
(3, 2, 1, "Économisez 5% sur l\'achat de service"),
(4, 2, 2, 'Support prioritaire premium'),
(5, 2, 3, 'Économisez 2 mois vs. mensuel');

-- --------------------------------------------------------

