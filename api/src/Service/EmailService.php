<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Order;
use App\Entity\ConfirmEmail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class EmailService
{
    public function __construct(private MailerInterface $mailer, private EntityManagerInterface $em) {}

    public function sendResetPasswordEmail(string $locale, User $user, string $resetToken): void
    {
        switch ($locale) {
            case 'fr-FR':
                $subject = 'Cyna - Lien pour réinitialiser votre mot de passe';
                break;
            case 'ar-SA':
                $subject = 'رابط لإعادة تعيين كلمة المرور الخاصة بك';
                break;
            default:
                $subject = 'Cyna - Link to reset your password';
                break;
        }

        $email = (new TemplatedEmail())
            ->from('noreply@cyna.com')
            ->to($user->getEmail())
            ->subject($subject)
            ->htmlTemplate('emails/' . $locale . '/passwordReset.html.twig')
            ->context([
                'resetLink' => sprintf("http://localhost:5173/reset-password?token=%s", $resetToken)
            ]);

        $this->mailer->send($email);
    }

    public function sendEmailVerificationEmail(User $user, string $locale = 'en-GB'): void
    {
        $emailAdress = $user->getEmail();

        if (!$emailAdress) {
            return;
        }

        $emailToken = bin2hex(random_bytes(32));
        $timezone = new \DateTimeZone('Europe/Paris');
        $expiresAt = new \DateTimeImmutable('+15 minutes', $timezone);
        $confirmEmail = $this->em->getRepository(ConfirmEmail::class)->findOneBy(['email' => $emailAdress]);

        if ($confirmEmail) {
            $confirmEmail->setEmailToken($emailToken);
            $confirmEmail->setExpiresAt($expiresAt);
        } else {
            $confirmEmail = new ConfirmEmail();
            $confirmEmail->setEmail($emailAdress);
            $confirmEmail->setEmailToken($emailToken);
            $confirmEmail->setExpiresAt($expiresAt);
        }

        $this->em->persist($confirmEmail);
        $this->em->flush();

        switch ($locale) {
            case 'fr-FR':
                $subject = 'Cyna - Lien pour valider votre adresse email';
                break;
            case 'ar-SA':
                $subject = 'رابط لتأكيد عنوان بريدك الإلكتروني';
                break;
            default:
                $subject = 'Cyna - Link to confirm your email address';
                break;
        }

        $email = (new TemplatedEmail())
            ->from('noreply@cyna.com')
            ->to($emailAdress)
            ->subject($subject)
            ->htmlTemplate('emails/' . $locale . '/confirmEmail.html.twig')
            ->context([
                'verifiedEmailLink' => sprintf("http://localhost:5173/confirm-email?token=%s", $emailToken)
            ]);

        $this->mailer->send($email);
    }

    public function send2faCodeEmail(User $user, string $otpCode): void
    {
        $emailAdress = $user->getEmail();

        if (!$emailAdress) {
            return;
        }

        $subject = 'Cyna - Two-Factor Verification Code';

        $email = (new TemplatedEmail())
            ->from('noreply@cyna.com')
            ->to($emailAdress)
            ->subject($subject)
            ->htmlTemplate('emails/en-GB/twoFaCode.html.twig')
            ->context([
                'optCode' => $otpCode
            ]);

        $this->mailer->send($email);
    }

    public function sendInvoiceEmail(User $user, Order $order, string $pdfFilePath, string $locale = 'en-GB'): void
    {
        switch ($locale) {
            case 'fr-FR':
                $subject = 'Cyna - Facture de votre commande - ';
                break;
            case 'ar-SA':
                $subject = 'فاتورة طلبك من Cyna';
                break;
            default:
                $subject = 'Cyna - Invoice for your order- ';
                break;
        }

        $email = (new TemplatedEmail())
            ->from('noreply@cyna.com')
            ->to($user->getEmail())
            ->subject($subject . $order->getReference())
            ->htmlTemplate("emails/$locale/invoiceEmail.html.twig")
            ->context([
                'user' => $user,
                'order' => $order,
            ])
            ->attachFromPath($pdfFilePath, 'invoice_' . $order->getReference() . '.pdf', 'application/pdf');

        $this->mailer->send($email);
    }
}
